import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        favorites: [{
            type: Schema.Types.ObjectId,
            ref: 'Movie',
        }],

        watchlist: [{
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }],

        following: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        followers: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        profilePicture: {
            type: String,
            default: ''
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default mongoose.model("User", schema);