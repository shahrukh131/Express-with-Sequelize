const sendError = (res, statusCode, message) =>{
    res.status(statusCode).json({
      error: {
        code: statusCode,
        message: message
      }
    });
  }

  module.exports = { sendError};