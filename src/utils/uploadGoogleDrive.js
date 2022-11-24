require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.DRIVE_REFRESH_TOKEN,
});

const uploadGDProfilePhoto = async (file) => {
  try {
    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimeType,
        parents: ["19cTL5Qm8-v3J3UYYpSxUvlGzSFtwTe9L"],
      },
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(file.path),
      },
    });

    drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: response.data.id,
      fields: "webViewLink, webContentLink",
    });

    return {
      id: response.data.id,
      gdLink: result.data.webViewLink,
    };
  } catch (error) {
    console.log(error);
  }
};

const uploadGDPortfolio = async (file) => {
  try {
    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimeType,
        parents: ["1yOH2DZP6XDmH7mDqJz5er0WEa66YE7hp"],
      },
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(file.path),
      },
    });

    drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: response.data.id,
      fields: "webViewLink, webContentLink",
    });

    return {
      id: response.data.id,
      gdLink: result.data.webViewLink,
    };
  } catch (error) {
    console.log(error);
  }
};

const uploadGDExperience = async (file) => {
  try {
    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimeType,
        parents: ["1N2hVs-1rrKXY-yNcF-zy9bxVooLo8AFd"],
      },
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(file.path),
      },
    });

    drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: response.data.id,
      fields: "webViewLink, webContentLink",
    });

    return {
      id: response.data.id,
      gdLink: result.data.webViewLink,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadGDProfilePhoto,
  uploadGDPortfolio,
  uploadGDExperience,
};
