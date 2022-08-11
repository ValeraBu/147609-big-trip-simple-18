const path = require("path")
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    filename: "bundle.js"
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "build" },],
    }),
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        }
    ]
  }
}