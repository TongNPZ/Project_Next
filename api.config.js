// next.config.js
require('dotenv').config();

const nextConfig = {
    // กำหนดค่า environment variables ให้กับ Next.js config
    env: {
        API_URL: process.env.API_URL
    }
};

module.exports = nextConfig;