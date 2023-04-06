const { Comment } = require("./models/Comment");
const { Like } = require("./models/Like");
const { Post } = require("./models/Post");
const { Profile } = require("./models/Profile");
const { User } = require("./models/User");

// Define your associations here


module.exports = {
    Comment,
    Like,
    Post,
    Profile,
    User
}