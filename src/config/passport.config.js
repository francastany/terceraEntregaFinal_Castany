import passport from "passport";
import local from 'passport-local';
import userService from "../DAO/Mongo/user.js";
import { validatePassword } from "../services/auth.js";

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: "Incomplete values" })
        const user = await userService.getBy({ email })
        if (!user) return done(null, false, { message: "Invalid user" })
        const isValidPassword = await validatePassword(password, user.password)
        if (!isValidPassword) return done(null, false, { message: "Invalid Password" })
        return done(null, user);
    }));
}
export default initializeStrategies;