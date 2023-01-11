const Tag = require("../models/tag.model");

const addTag = async (req, res) => {
  const { tagName } = req.body;

  const tag = new Tag({
    tagName: tagName,
  });
  try {
    if (!tagName) {
      return res.status(200).json({ message: "Tag name is required" });
    }
    const data = await tag.save();
    if (data) {
      res.status(200).json({ message: "data uploaded successfully" });
    }
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const getAllTag = async (req , res) =>{
  try {
    const tags = await Tag.aggregate([{ $project: { value: "$_id", label: "$tagName", _id: 0 } }]);
    return res.status(200).json(tags);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
}

const getLatestTag = async (req , res) =>{
  try {
    const tags = await Tag.find({}).sort({updatedAt: -1}).limit(10);
    return res.status(200).json(tags);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
}

const updateTagById = async (req , res) =>{
  try {
    const tag = await Tag.findByIdAndUpdate(req.body._id, req.body)
    if(tag){
      return res.status(200).json({
        message:"updated successfully"
      });
    }
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
}


module.exports = { addTag ,getAllTag ,updateTagById ,getLatestTag};
