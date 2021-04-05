// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  distDir: "build",
  publicRuntimeConfig: {
    // add your public runtime environment variables here with NEXT_PUBLIC_*** prefix
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: function (config, options) {
    return config;
  },
  env: {
    'NEXT_PUBLIC_API_ENDPOINT': process.env.NEXT_PUBLIC_API_ENDPOINT
  }
};
