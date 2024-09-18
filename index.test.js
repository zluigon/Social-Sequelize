const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");

const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");
const posts = require("./seed/posts.json");
const profiles = require("./seed/profiles.json");
const users = require("./seed/users.json");

describe("Social Sequelzie Test", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the test suite is run
    await db.sync({ force: true });
  });

  // Write your tests here

  //   test("replace with your test", function () {
  //     expect(true).toBe(true);
  //   });

  test("can create Users", async () => {
    await User.bulkCreate(users);
    const foundUser = await User.findByPk(1);
    expect(foundUser).toEqual(expect.objectContaining(users[0]));
  });

  test("can create Profiles", async () => {
    await Profile.bulkCreate(profiles);
    const foundProfile = await Profile.findByPk(1);
    expect(foundProfile).toEqual(expect.objectContaining(profiles[0]));
  });

  test("can create Posts", async () => {
    await Post.bulkCreate(posts);
    const foundPost = await Post.findByPk(1);
    expect(foundPost).toEqual(expect.objectContaining(posts[0]));
  });

  test("can create Comments", async () => {
    await Comment.bulkCreate(comments);
    const foundComment = await Comment.findByPk(1);
    expect(foundComment).toEqual(expect.objectContaining(comments[0]));
  });

  test("can create Likes", async () => {
    await Like.bulkCreate(likes);
    const foundLike = await Like.findByPk(1);
    expect(foundLike).toEqual(expect.objectContaining(likes[0]));
  });

  test("User can have a Profile", async () => {
    const currUser = await User.create(users[4]);
    const currProfile = await Profile.create(profiles[0]);

    await currUser.setProfile(currProfile);

    const setProfile = await currUser.getProfile();
    expect(setProfile instanceof Profile).toBeTruthy();
  });

  test("Users can have Likes", async () => {
    const user1 = await User.create(users[2]);
    const like1 = await Like.create(likes[1]);
    const like2 = await Like.create(likes[3]);

    await user1.setLikes([like1, like2]);
    const userLikes = await user1.getLikes();

    expect(userLikes.length).toBe(2);
  });
});
