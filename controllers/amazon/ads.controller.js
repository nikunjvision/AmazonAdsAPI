const {
  HttpClient,
  OperationProvider,
  ProfileOperation,
} = require("@scaleleap/amazon-advertising-api-sdk");

exports.listProfiles = async (req, res) => {
  try {
    if (!req.accessToken) {
      return res.status(401).send({ message: "Please required access token." });
    }
    const auth = {
      accessToken: req.accessToken,
      clientId: process.env.CLIENT_ID,
    };
    const httpClient = new HttpClient(`${process.env.ROOT_LINK}`, auth);
    const operationProvider = new OperationProvider(httpClient);
    const profileOperation = operationProvider.create(ProfileOperation);
    const profiles = await profileOperation.listProfiles();
    return res.status(200).send({ message: "List Profiles", data: profiles });
  } catch (error) {
    return res.status(500).send({ message: error.message, error });
  }
};
