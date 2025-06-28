import mongoose from "mongoose";
import { Schema } from "mongoose";

const movieSchema = new Schema({
    tmdbId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    posterPath: {
        type: String,
        required: true,
        trim: true 
    },
    videoKey: {
        type: String,
        required: false, // some movied do not have trailers
        trim: true
    },
    overview: {
        type: String,
        required: true,
        trim: true 
    },
    genres: {
        type: [String],
        required: true
    },
    voteAverage: {
        type: Number,
        required: false
    },
    popularity: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
});

// Update 'updateAt' on every save
movieSchema.pre('save', function(next)  {
    this.updatedAt = Date.now();
    next();
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;