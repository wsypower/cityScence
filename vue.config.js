const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
/**
 * 如果您的端口设置为80，
 * 使用管理员权限执行命令行。
 * 例如，Mac：sudo npm run
 * 您可以通过以下方法更改端口：
 * port=9527 npm run serve 或 npm run serve --port=8080
 */
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 配置多个代理
    proxy: {
      "/proxy": {
        target: "http://192.168.71.33:8369/stage/jump/",
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          "^/proxy": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"), // 主目录
        views: resolve("src/views"), // 页面
        images: resolve("src/assets/images"),
        components: resolve("src/components"), // 组件
        api: resolve("src/api"), // 接口
        utils: resolve("src/utils"), // 通用功能
        assets: resolve("src/assets"), // 静态资源
        style: resolve("src/style"), // 通用样式
      },
    },
  },
  // 去除vue元素之间的空格
  chainWebpack(config) {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config.when(process.env.NODE_ENV === "development", (config) =>
      // sourcemap不包含列信息
      config.devtool("cheap-source-map")
    );
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);
    config.when(process.env.NODE_ENV !== "development", (config) => {
      // 压缩html中的css
      config.plugin("html").tap((args) => {
        args[0].minify.minifyCSS = true;
        return args;
      });
      // 启动 webpack 打包分析
      config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            //`runtime`必须与runtimeChunk名称相同。默认是“运行时”
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      /*===============================
      =            文件拆分            =
      =================================*/

      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          vantUI: {
            name: "chunk-Element",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element(.*)/,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
  // ====================================================== //
  // ====================== CSS 相关选项 ====================== //
  // ====================================================== //
  css: {
    loaderOptions: {
      // 设置 scss 公用文件
      sass: {
        prependData: '@import "style/settings.scss";',
      },
    },
  },
};
