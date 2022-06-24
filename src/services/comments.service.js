const Comment = require('../models/comment.model');

class CommentsService {

    async findAll(req) {
        const comments = await User.find();
        if (!comments) {
            throw new Error("No Records found")
        }

        return comments;
    }

    async create(req) {
        const comment = new Comment(req.body);
        await comment.save();

        return comment;
    }

    async findById(req) {
        const comment = await Comment.findById(req.params.id);

        return comment;
    }

    async stats(req) {
        const hashtags = await Comment.aggregate([
            { $unwind: "$hashTags" },
            {
                $group: {
                    _id: "$hashTags",
                    count: {
                        "$sum": 1
                    }
                }
            },
            {$sort: {
                    count: -1
                }},
            {$limit: 10},
        ])

        const mentions = await Comment.aggregate([
            { $unwind: "$mentions" },
            {
                $group: {
                    _id: "$mentions",
                    count: {
                        "$sum": 1
                    }
                }
            },
            {$sort: {
                    count: -1
                }},
            {$limit: 10},
        ])


        return {
            hashtags,
            mentions
        }
    }

    async findForUser(req) {
        const userId = req.params.userId;
        const comments = await Comment.find({ userId }).populate({
            path:'userId',
            match: {
                _id: userId,
            },
            select: 'contact'
        })
            .exec();
        return comments;
    }

    async update(req) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["hashTags", "mentions", "text"];
        const isValid = updates.every((update) => {
            return allowedUpdates.includes(update);
        })

        if (!isValid) {
            throw new Error("Invalid update")
        }

        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);

        return comment
    }

    async delete(req) {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        return comment;
    }
}

module.exports = CommentsService
