import config from '../config/config.js';

const register = (req, res) => {
    res.render('register');
};
const login = (req, res) => {
    const token = req.cookies[config.jwt.cookie];
    token ? res.render('products') : res.render('login');
};
const logout = (req, res) => {
    res.clearCookie(config.jwt.cookie);
    res.render('logout');
};
export default {
    register,
    login,
    logout
};
