const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options: {
            presets : ['@babel/preset-reset']
          }
        }
      }
    ]
  }
}

module.exports = {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['en']
    })
  ]
};