const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/App.tsx"),

  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "../public/dist")
  },

  watch: true,
  watchOptions: {
    //poll: true,
    ignored: ["node_modules/**","src/App.test.tsx"],
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },

      // CSS
      {
        test: /\.css$/,
        //include: path.join(__dirname, 'src/components'),
        use: [
          "style-loader",
          "css-loader",
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: undefined
    }) // ts-loader plus this is similar to awesome-typescript-loader just faster.
  ]
};
