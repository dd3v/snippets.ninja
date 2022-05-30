const webpack = require('webpack');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
  pwa: {
    name: 'Snippets >< Ninja',
    themeColor: 'hsl(0, 0%, 100%)',
    msTileColor: 'hsl(0, 0%, 100%)',

    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/sw.js',
      // ...other Workbox options...
    },
    manifestOptions: {
      icons: [
        {
          src: 'img/icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'img/icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'img/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'img/icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'img/icons/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'img/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: 'img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable any',
        },
      ],
    },
  },
});
