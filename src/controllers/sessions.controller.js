import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import userService from '../DAO/Mongo/user.js';
import { createHash } from "../services/auth.js";
import { transporter } from "../services/mailer.js";
import { logger } from '../services/logger.js';

const register = async (req, res) => {
    const file = req.file;
    if(!file) return res.status(500).send({ status: 'error', message: 'Error saving the file' });
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const exists = await userService.getBy({ email });
    if (exists) return res.status(400).send({ status: "error", error: "This user already exists" });
    const hashedPassword = await createHash(password);
    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    }
    await userService.save(user);
    const result = await transporter.sendMail({
        from: `The Sticker Hub <${config.mailer.GMAIL_USER}>`,
        to: config.mailer.GMAIL_USER,
        subject: `NEW USER REGISTERED`,
        html: `
        <div>
            <h2>NEW USER: </h2>
            <h4>  ${user.first_name} ${user.last_name}</h4>
            <h6>  ${user.email}</h6>
        </div>
        `
    });
    res.send({ status: "success", message: "Registered succesfully"});
};
const login = async (req, res) => {
    try {
        const user = req.user;
        const token = {
            id: user._id,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            avatar: user.avatar
        };
        const userToken = jwt.sign(token, config.jwt.token, {expiresIn: '1d'});
        res.cookie(config.jwt.token, token).send({ status: 'success', message: 'Logged In'});
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Server Error'});
    };
};
const loginFail = (req, res) => {
    res.clearCookie(config.jwt.cookie);
    logger.error('The login has failed! Try again.');
    res.render('/');
};
export default {
    register,
    login,
    loginFail
};