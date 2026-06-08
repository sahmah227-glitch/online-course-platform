const Comment = require('../models/Comment');
const Lesson = require('../models/Lesson');


exports.getCommentsByLesson = async (req, res) => {
  try {
    const comments = await Comment.find({ lesson: req.params.lessonId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const lessonId = req.params.lessonId;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const comment = new Comment({
      text,
      lesson: lessonId,
      user: req.user._id,
    });

    const createdComment = await comment.save();
    
 
    const populatedComment = await Comment.findById(createdComment._id).populate('user', 'name');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
