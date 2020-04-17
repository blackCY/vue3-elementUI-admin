## hidtory

history 使用了 HTML5 的 pushState() 和 replaceState(), 如果 URL 中不想使用 #, 需要后端使用 nginx 配置路由

## problem

- vue.config.js 全局配置样式文件不奏效
- vue.config.js chainWebpack config.resolve 到底存在不存在

## requireModuleExtension

此选项会导致 element-ui 样式设置不成功, 需要设置为默认, 但是可能 css module 就没有了, 可能需要设置

```css
css {
  loaderOptions {
    css {
      modules: {
        localidentname: '[name]-cy[hash:5]';
      }
      ,localsconvention: 'camelCaseOnly';
    }
  }
}
```
