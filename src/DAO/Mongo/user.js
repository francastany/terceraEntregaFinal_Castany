import userModel from './models/userModel.js';

import { logger } from '../../services/logger.js';

class UserClass {

    async save(user) {
        try {
            await userModel.create(user);
            const newUser = await userModel.find(user);
            return newUser;
        } catch (error) {
            logger.warning('Error creating the user');
            // console.log('Error creating the user');
        }
    };

    async getBy(params) {
        try {
            const user = await userModel.findOne(params);
            return user;
        } catch (error) {
            logger.warning('Error finding the user.');
            // console.log('Error finding the user');
        }
    };

    async getAll() {
        try {
            const users = await userModel.find({});
            return users;
        } catch (error) {
            logger.warning('Error getting all users.');
            // console.log('Error getting all users.');
        }
    };
};

const userService = new UserClass();
export default userService;