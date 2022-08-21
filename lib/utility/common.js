module.exports = {
  clone: (object) => {
    return JSON.parse(JSON.stringify(object));
  },

  response_function(status_code, status, message, result_message) {
    const server_response = {
      status_code,
      status,
      message,
      data: result_message,
    };
    return server_response;
  },
};
