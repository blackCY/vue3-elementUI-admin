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

## vue3.0 两种模式

- compiler (模板) 模式
- runtime 模式 (运行时)
- vue 模块的默认为 runtime 模式, 指向了 dist/vue.runtime.common.js 位置
  即 'import vue from vue' 中的 vue 就是此位置的 js 文件内容
- 2.x 用的是 compiler 模式, 所以 runtime 模式 解析不了 template, 需要指向到 vue/dist/vue.js 文件

### compiler (模式) 模板

new Vue({
el: '#app',
router: router,
store: store,
template `<App/>`,
components: { App }
})

### runtime 模式(运行时)

new Vue({
routerm,
store,
render: h => h(App)
}).\$mount('#app')

### 正向代理/反向代理

### require.context(param1, param2, param3)

读取指定目录的所有文件
param1: 目录
param2: 是否遍历子级目录
param3: 定义遍历文件规则, 如要遍历的文件是什么后缀的文件, 可以用正则

```javascript
require.context('/svg', false, /\.svg$/);
```

### vue 中最好不要同时使用 v-if 和 v-for, 可以使用 template 做一层包裹, template 上使用 v-for, 子层里使用 v-if

### vue3.0 到底有什么不一样的地方

vue3.0 对 vue 的主要三个特点: `响应式, 模板, 对象式的组件声明方式`, 进行了全面的更改, 底层的实现和上层的 api 都有了明显的变化
基于 Proxy 重新实现了响应式, 基于 treeshaking 内置了更多功能, 提供了类式的组件声明方式

### svg-sprite-loader

Webpack 加载器, 用于创建 SVG 精灵, 精灵会自动呈现并注入页面中, 您只需通过引用图像即可 `<svg><use xlink:href="#id"></use></svg>`, 即通过 use 进行 svg 精灵图的复用, 从而使 svg 配置最小
svg 堆叠技术
svg-sprite-loader 可以多个 svg 图标合并, 使用时只需根据合并的 symbol 的 id 即可

### Vue 知识点 - props 传值

1. 传入一个数字

```html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>
```

2. 传入一个数组

```html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
```

3. 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解

额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告

**注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态**

4. Prop 验证

**注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的**

**自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出**

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助

为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如

```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true,
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100,
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' };
      },
    },
    // 自定义验证函数
    propF: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1;
      },
    },
  },
});
```

5. 类型检查

type 可以是下列原生构造函数中的一个:

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

**额外的，type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认。例如，给定下列现成的构造函数：**

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
Vue.component('blog-post', {
  props: {
    author: Person,
  },
});
```

来验证 author prop 的值是否是通过 new Person 创建的

6. 禁用 Attribute 继承

如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

```javascript
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
});
```

这尤其适合配合实例的 \$attrs 属性使用，该属性包含了传递给一个组件的 attribute 名和 attribute 值，例如：

```json
{
  "required": true,
  "placeholder": "Enter your username"
}
```

**有了 inheritAttrs: false 和 \$attrs，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写基础组件的时候是常会用到的**

```javascript
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `,
});
```

**注意 inheritAttrs: false 选项不会影响 style 和 class 的绑定**

**这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素：**

```html
<base-input v-model="username" required placeholder="Enter your username"></base-input>
```

### HTML5 存储 和 cookie_js 存储的区别

- HTML5: 存储大小 5M 左右, 存储于客户端, 只能存储字符串类型, 存储一些比较简单的东西, 或是小的交互
- cookie: 携带请求头 cookie

### Vuex

vuex 热重载

### 路由守卫

## feature 重新构建点

rem + vh/vm ?
pug
ts
第三方登录
测试覆盖率
