const collectRequestData = (req, callback) => {
  let body = "";
  req.on("data", (data) => {
    body += data.toString();
  });
  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    callback(parsedBody);
  });
};

module.exports = collectRequestData;
