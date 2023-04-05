const sendSuccess = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    code: statusCode,
    message: message,
    data: data != undefined ? data : "",
  });
};

module.exports = { sendSuccess };
