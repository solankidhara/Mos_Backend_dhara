const SizeType = require("../models/size.model");

const addSize = async (req, res) => {
  const { name } = req.body;

  const contentSize = new SizeType({
    name: name,
  });

  try {
    if (!name) {
      return res.status(200).json({ message: "name is required" });
    }
    const data = await contentSize.save();
    if (data) {
      res.status(200).json({ message: "data uploaded successfully" });
    }
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const getSizes = async (req , res) =>{
  try {
    const contentSize = await SizeType.aggregate([{ $project: { value: "$_id", label: "$name", _id: 0 } }]);
    return res.status(200).json(contentSize);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
}

const updateSizeById = async (req , res) =>{
  try {
    const contentSize = await SizeType.findByIdAndUpdate(req.body._id, req.body)
    if(contentSize){
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


module.exports = { addSize ,getSizes ,updateSizeById};
