const path = require('path');

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'vue图片预览组件'
    }
  },
  configureWebpack: config => {
    config.resolve.alias = Object.assign(config.resolve.alias,
      {
        '@src': path.resolve(__dirname, './src/'),
        '@utils': path.resolve(__dirname, './src/utils/')
        // '~entry': path.resolve(__dirname, './src/index.js') // 注意：这个不能省略
      });
  },
  devServer: {
    hot: true
  }
};
