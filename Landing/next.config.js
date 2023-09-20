/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    })
    return config
  },
}

// eslint-disable-next-line no-undef
module.exports = nextConfig
