module.exports = {
  presets: [
    "@vue/app",
    ["@babel/preset-env", { modules: false, useBuiltIns: "entry" }],
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
