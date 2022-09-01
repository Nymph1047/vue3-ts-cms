const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 1、配置方式一：CLI提供的属性
  outputDir: './build',
  publicPath: './',
  // 2、配置方式二：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        comments: '@/component'
      }
    }
  }
})
