const url = require("url");

const GetParam = (req) => {
  const reqUrl = url.parse(req.url, true);

  const pathSegments = reqUrl.pathname.split("/");
  const endpoint = pathSegments[1];
  const id = pathSegments[2];

  return {
    endpoint,
    id,
  };
};

module.exports = GetParam;
