import passport from "passport";
import local from 'passport-local';
import userService from "../DAO/Mongo/user.js";
import { validatePassword } from "../services/auth.js";
import config from "./config.js";


const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        if(email === config.app.ADMIN_USER && password === config.app.ADMIN_PASSWORD) {
            return done(null, {_id: 0, first_name: "Admin", last_name: "istrador", role: "admin", avatar: `http://localhost:${process.env.PORT || 8080}/img/admin.jpg`})
        };
        if (!email || !password) return done(null, false, { message: "Incomplete values" })
        const user = await userService.getBy({ email })
        if (!user) return done(null, false, { message: "Invalid user" })
        const isValidPassword = await validatePassword(password, user.password)
        if (!isValidPassword) return done(null, false, { message: "Invalid Password" })
        return done(null, user);
    }));
}
export default initializeStrategies;