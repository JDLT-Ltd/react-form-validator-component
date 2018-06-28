const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/lib/index.js"),
  output: {
    path: path.resolve(__dirname, "build/lib"),
    filename: "index.js",
    library: "",
    libraryTarget: "commonjs"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: ['src/docs'],
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};
