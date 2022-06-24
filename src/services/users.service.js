const User = require('../models/user.model');

class UsersService {

    async findAll(req) {
        const users = await User.find();
        if (!users) {
            throw new Error("No Records found")
        }

        return users;
    }

    async create(req) {
        const user = new User(req.body);
        await user.save();

        return user;
    }

    async findById(req) {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User does not exist")
        }

        return user;
    }

    async update(req) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["contact", "profilePictureUrl"];
        const isValid = updates.every((update) => {
            return allowedUpdates.includes(update);
        })

        if (!isValid) {
            throw new Error("Invalid update")
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        return user;
    }

    async delete(req) {
        const user = await User.findByIdAndDelete(req.params.id);

        return user;
    }
}

module.exports = UsersService
