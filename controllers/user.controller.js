const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};


module.exports = {
  allAccess
};