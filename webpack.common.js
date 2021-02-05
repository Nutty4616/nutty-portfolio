const Webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack');

module.exports = {
  entry: {
    vendor: './src/vendor.js',
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets',
              esModule: false,
            },
          },
        ],
      },
      {
        loader: ImageminPlugin.loader,
        options: {
          bail: false,
          cache: false,
          imageminOptions: {
            plugins: [
              ['pngquant', { quality: [0.5, 0.5] }],
              ['mozjpeg', { quality: 50, progressive: true }],
              ['gifsicle', { interlaced: true, optimizationLevel: 3 }],
              [
                'svgo',
                {
                  plugins: [{ removeViewBox: false }],
                },
              ],
            ],
          },
        },
      },
    ],
  },
  // This config allows to use jQuery $ sign
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
