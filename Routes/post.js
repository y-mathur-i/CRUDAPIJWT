const router = require("express").Router();
const verifyToken = require("./verifyToken");
const Post = require("../models/post");

// getting all posts
router.get("/get", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().lean();
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// adding post
router.post("/add", verifyToken, async (req, res) => {
  console.log(req.user);
  const userID = req.user._id;
  const postText = req.body.text;
  const post = new Post({
    userID: userID,
    text: postText,
  });
  try {
    const savedPost = await post.save();
    return res.status(200).send(savedPost);
  } catch (error) {
    return res.status(501).send(error);
  }
});

// get post from a specific user
router.get("/user", verifyToken, async (req, res) => {
  try {
    const id = req.user._id;
    const posts = await Post.find({ userID: id });
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// get a specific post using id
router.get("/post", verifyToken, async (req, res) => {
  try {
    // console.log(req.postId);
    const post = await Post.find({ _id: req.body.postId });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// removing a post using it's id

router.delete("/post", verifyToken, async (req, res) => {
  //   const postExist = await Post.find({ _id: req.body.postId });
  //   if (!postExist) {
  //     return res.status(400).send("post doesn't exist");
  //   }
  try {
    const deletedPost = await Post.deleteOne({ _id: req.body.postId });
    return res.status(200).send(deletedPost);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/post", verifyToken, async (req, res) => {
  const id = req.body.postId;
  try {
    const post = await Post.findById(id);
    if (post.userID != req.user._id) {
      return res.status(402).send("you cheeky bugger");
    } else {
      const newPost = await Post.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).send(newPost);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
