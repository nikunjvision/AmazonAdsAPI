const request = require("request");
const fs = require("fs");

exports.getAccessToken = async (req, res, next) => {
  let token = fs.readFileSync("token.json", { encoding: "utf-8" });
  token = JSON.parse(token);
  const expiryDate = token.expireIn;
  const currentDate = Date.now();
  if (
    req.headers.authorization == token.accessToken &&
    currentDate <= expiryDate
  ) {
    req.accessToken = req.headers.authorization;
    next();
  } else {
    request.post(
      {
        url: process.env.AUTH_ROOTLINK,
        form: {
          grant_type: process.env.GRANT_TYPE,
          client_id: process.env.CLIENT_ID,
          refresh_token: process.env.REFRESH_TOKEN,
          client_secret: process.env.CLIENT_SECRET,
        },
      },
      (error, httpResponse, body) => {
        try {
          if (error) console.log(error);
          if (httpResponse.statusCode != 200)
            console.log(
              "Something went wrong! Status code: " + httpResponse.statusCode
            );
          let data = JSON.parse(body);
          let response = {
            accessToken: data.access_token,
            expireIn: currentDate + 3600 * 1000,
          };
          fs.writeFileSync("./token.json", JSON.stringify(response));
          req.accessToken = data.access_token;
          next();
        } catch (error) {
          console.log("catch");
          if (error) return console.log(error);
        }
      }
    );
  }
};
