const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Snippets >< Ninja',
    themeColor: 'hsl(0, 0%, 100%)',
    msTileColor: 'hsl(0, 4%, 26%)',
    
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/sw.js',
      // ...other Workbox options...
    },
  },
});
