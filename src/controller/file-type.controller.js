const FileType = require("../models/file-type.model");

const addFileType = async (req, res) => {
  const { name } = req.body;

  const fileName = new FileType({
    name: name,
  });
  try {
    if (!name) {
      return res.status(200).json({ message: "name is required" });
    }
    const data = await fileName.save();
    if (data) {
      res.status(200).json({ message: "data uploaded successfully" });
    }
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
};

const getAllFileTypes = async (req , res) =>{
  try {
    const files = await FileType.aggregate([{ $project: { value: "$_id", label: "$name", _id: 0 } }]);
    return res.status(200).json(files);
  } catch (err) {
    res.status(err?.status || 500).json({
      message: err?.message,
    });
  }
}

const updateFileById = async (req , res) =>{
  try {
    const file = await FileType.findByIdAndUpdate(req.body._id, req.body)
    if(file){
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


module.exports = { addFileType ,getAllFileTypes ,updateFileById};
