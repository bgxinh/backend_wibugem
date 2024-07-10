import CRUDServices from "../services/CRUDService";

let getHomepage = (req, res) => {
  try {
    return res.render("test/homepage.ejs");
  } catch (e) {
    console.log(e);
  }
};

const createNewUser = async (req, res) => {
  if (!req.body) {
    return res.status(200).json({
      codeErr: 1,
      messageErr: "Missing parameter",
    });
  } else {
    let message = await CRUDServices.createNewUser(req.body);
    return res.status(200).json(message);
  }
};

const deleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      codeErr: 0,
      messageErr: "Missing id",
    });
  } else {
    let message = await CRUDServices.deleteUserById(req.body.id);
    return res.status(200).json(message);
  }
};

const getAllUser = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await CRUDServices.getUserPagination(+page, +limit);
      return res.status(200).json({
        errCode: data.errCode,
        mesageErr: data.mesageErr,
        users: data.data,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        mesageErr: "Missing input",
        users: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  if (!req.body)
    return res
      .status(200)
      .json({ codeErr: 1, messageErr: "Missing Parameter" });
  else {
    let message = await CRUDServices.upDateUserInformation(req.body);
    return res.status(200).json(message);
  }
};
module.exports = {
  getHomepage: getHomepage,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  updateUser: updateUser,
};
