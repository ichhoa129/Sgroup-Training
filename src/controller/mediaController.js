const { uploadCloudinary } = require("../helpers/cloudinaryUpload");
const { HTTPException } = require("../helpers/errorHandler");

const uploadSingle = async (req, res, next) => {
  try {
    console.log(req.file.path);
    let data = await uploadCloudinary(req.file.path);
    if(!data) {
      throw new HTTPException(400, "There is error");
    }
    return res.json({
      status: "success",
      statusCode: 200,
      data,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const uploadMany = async (req, res, next) => {
  try {
    const promises = [];
    for (let i = 0; i < req.files.length; i++) {
      promises.push(uploadCloudinary(req.files[i].path));
    }
    const data = await Promise.all(promises);
    return res.json({
      status: "success",
      statusCode: 200,
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  uploadSingle,
  uploadMany,
}