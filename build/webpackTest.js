/**
 * Created by yunrui001 on 2017-11-22.
 */
var webpack = require('webpack')
var path = require('path')


var webpackConfig = {
  entry: './build/test.js',
  output: {
    path: __dirname,
    filename: 'static/[name].js'
  }
}
webpack(webpackConfig, (err, stats) => {
  var keys = Object.keys(stats)
  for (var i = 0, length = keys.length; i < length; i++) {
    console.log(stats[keys[i]])
  }
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
})
