const { v2: Cloudinary } = require("cloudinary");
const dotenv = require('dotenv');

dotenv.config()

Cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRETE
})

module.exports = { Cloud: Cloudinary };
  