/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FB_API_KEY: "",
    FB_AUTH_DOMAIN: "",
    FB_DATABASE_URL: "",
    FB_PROJECT_ID: "",
    FB_STORAGE_BUCKET: "",
    FB_MESSAGING_SENDER_ID: "",
    FB_APP_ID: "",
    FB_MEASUREMENT_ID: "",
  },
};

module.exports = nextConfig;
