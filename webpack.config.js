const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/', //Adjust if necessary
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  devtool: "eval-source-map",
  plugins: [
    // new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Shrek RPG",
      template: "./src/index.html",
      inject: "body",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|avif|jpe?g)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
          publicPath: "assets/images/",
          outputPath: "assets/images/",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: {
                list: [
                  // All default supported tags and attributes
                  "...",
                  // Ignore img src attribute if it's empty
                  {
                    tag: "img",
                    attribute: "src",
                    type: "src",
                    filter: (tag, attribute, attributes, resourcePath) => {
                      // Only keep the img with src that is not empty
                      return attributes.find(attr => attr.name === "src" && attr.value !== '');
                    }
                  }
                ]
              }
            }
          }
        ],
      },
    ],
  },
};