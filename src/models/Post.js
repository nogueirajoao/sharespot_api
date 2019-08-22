const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LikeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user'}
});

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    replies: [{ 
        content: { type: String, require: true },
        user: { type: Schema.Types.ObjectId, ref: 'user', required: true }
    }]
}, { timestamps: true });

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true},
    content: { type:String, required: true },
    likes: [LikeSchema],
    comments: [CommentSchema],
    location: [Number]
}, { timestamps: true });

const Post = mongoose.model('post', PostSchema);

module.exports = Post;