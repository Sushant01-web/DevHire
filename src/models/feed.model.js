/* This is schemas and validation for feed */

import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema(
    {
        userId: String,

        userName: String,

        message: String,

        image: String,

        likes: {
            type: [
                {
                    reactorUserId: String,
                    reactorUserName: String,
                },
            ],

            default: [],
        },

        comments: {
            type: [
                {
                    commentUserId: String,
                    commentUserName: String,
                    commentText: String,
                },
            ],

            default: [],
        },
    },

    {
        timestamps: true,
    }
);

const Feed =
    mongoose.models.Feed ||
    mongoose.model("Feed", FeedSchema);

export default Feed;