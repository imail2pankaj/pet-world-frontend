/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const webpack = require("webpack");
const nextConfig = {
  images: {
    domains: ['localhost','pet.scenicitsolutions.com','pet-api.scenicitsolutions.com']
  },
  reactStrictMode: true,
  i18n,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
}

module.exports = nextConfig
