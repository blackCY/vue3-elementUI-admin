const path = require('path');

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devDist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',
  // eslint-loader 是否在保存时检查
  lintOnSave: true, // 默认 true
  chainWebpack: config => {
    // alias
    // config.resolve.alias.set('@', resolve('./src'));
  },
  configureWebpack: config => {
    // 配置解析别名
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@views': path.resolve(__dirname, './src/views'),
        public: path.resolve(__dirname, './public'),
      },
    };
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false, // 默认 true, 使用 false 加速生产环境构建
  /**
   * css 相关配置
   */
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中, 即是否使用 ExtractTextPlugin
    extract: true, // 默认: 生产环境 true, 开发环境 false // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取
    sourceMap: false, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    // 预设
    // 支持的 loader 有:
    // css-loader
    // postcss-loader
    // sass-loader
    // less-loader
    // stylus-loader
    // 另外，也可以使用 scss 选项，针对 scss 语法进行单独配置
    loaderOptions: {
      // css: {
      //   // 这里的选项会传递给 css-loader
      //   modules: {
      //     localIdentName: '[name]-cy[hash:5]',
      //   },
      //   localsConvention: 'camelCaseOnly',
      // },
      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      // },
      // 全局样式
      sass: {
        prependData: `@import "./src/styles/main.scss";`,
      },
    },
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    // 提示: 如果你在 css.loaderOptions.css 里配置了自定义的 CSS Module 选项，则 css.requireModuleExtension 必须被显式地指定为 true 或者 false，否则我们无法确定你是否希望将这些自定义配置应用到所有 CSS 文件中
    requireModuleExtension: true,
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
  parallel: require('os').cpus().length > 1, // 默认 require('os').cpus().length > 1
  pwa: {},
  devServer: {
    open: false,
    host: '0.0.0.0', // 可以被外界访问
    port: 8080,
    https: false, // 失败时刷新页面
    hot: true,
    hotOnly: false,
    // proxy: {}, // 设置代理
    // 全屏模式下是否显示错误
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {},
};
