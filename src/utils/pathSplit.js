const pathSplit = (req, path) => {
  return "http://"+req.get("host") + "/" + path.split("/").slice(1).join("/");
};
module.exports = pathSplit;
