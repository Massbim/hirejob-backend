const response = (res, result, message, status, pagination) => {
  const resultRespon = {};
  resultRespon.status = "success";
  resultRespon.statusCode = status || 200;
  resultRespon.message = message || null;
  resultRespon.data = result;
  if (pagination) resultRespon.pagination = pagination;
  res.status(status).json(resultRespon);
};

const responnotdata = (req, res, data) => {
  console.log(data === undefined);
  if (data === undefined) {
    res.json({
      msg: "Data not found",
    });
  }
};

module.exports = {
  response,
  responnotdata,
};
