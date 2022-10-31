import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const config = new AWS.Config({
  accessKeyId: "AKIAUAYTNPY642FXYMMF",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

const CLOUND_FRONT_URL = "https://d915cnlfqwxuy.cloudfront.net/";

AWS.config = config;

const s3 = new AWS.S3({
  accessKeyId: "AKIAUAYTNPY642FXYMMF",
  secretAccessKey: "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",
});

export const uploadToS3 = (files) => {
  let response = {};
  let filesResults = [];
  if (files) {
    for (var i = 0; i < files.length; i++) {
      const filename = files[i].name;
      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];

      const filePath = `${uuidv4() + Date.now().toString()}.${fileType}`;
      const params = {
        Bucket: "app-chat-s3",
        Key: filePath,
        Body: files[i],
      };
      filesResults = [...filesResults, `${CLOUND_FRONT_URL}${filePath}`];
      s3.upload(params, (error) => {
        if (error) {
          console.log("error = ", error);
          // return res.send("Internal Server Error");
          response = { status: false, message: "Fail to upload file" };
          return response;
        }
      });
    }
    console.log(filesResults);
    response = {
      status: true,
      message: "Upload successfully",
      files: filesResults,
    };
    return response;
  }
};
