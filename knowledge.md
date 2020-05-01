## vue-quill-editor 富文本

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

### .sync 修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。

这也是为什么我们推荐以 update:myPropName 的模式触发事件取而代之。举个例子，在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

`this.$emit('update:title', newTitle)`
然后父组件可以监听那个事件并根据需要更新一个本地的数据属性。例如：

```html
<text-document v-bind:title="doc.title" v-on:update:title="doc.title = $event"></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 .sync 修饰符：

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

**注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync="doc.title + '!'" 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-model**
**即需要做逻辑处理的时候, 不能用修饰符**

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：

```html
<text-document v-bind.sync="doc"></text-document>
```

这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

**将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync="{ title: doc.title }"，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑**

### 插槽

在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的 attribute。新语法的由来可查阅这份 RFC

#### 插槽内容

Vue 实现了一套内容分发的 API，这套 API 的设计灵感源自 Web Components 规范草案，将 `<slot>` 元素作为承载分发内容的出口

它允许你像这样合成组件

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

然后你在 `<navigation-link>` 的模板中可能会写为

```html
<a v-bind:href="url" class="nav-link">
  <slot></slot>
</a>
```

当组件渲染的时候，`<slot></slot>` 将会被替换为 "Your Profile"。插槽内可以包含任何模板代码，包括 HTML, 甚至其它的组件

#### 编译作用域

当你想在一个插槽中使用数据时，例如

```html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```

**该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 `<navigation-link>` 的作用域。例如 url 是访问不到的**

```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!--
  这里的 `url` 会是 undefined，因为其 (指该插槽的) 内容是
  _传递给_ <navigation-link> 的而不是
  在 <navigation-link> 组件*内部*定义的。
  -->
</navigation-link>
```

作为一条规则，请记住: **父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的**

#### 后备内容

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染

#### 具名插槽

有时我们需要多个插槽。例如对于一个带有如下模板的 `<base-layout>` 组件

```html
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

**对于这样的情况，`<slot>` 元素有一个特殊的 attribute：name。这个 attribute 可以用来定义额外的插槽**

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

**一个不带 name 的 `<slot>` 出口会带有隐含的名字 default**

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 v-slot 的 `<template>` 中的内容都会被视为默认插槽的内容

然而，如果你希望更明确一些，仍然可以在一个 `<template>` 中包裹默认插槽的内容

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

注意 v-slot 只能添加在 `<template>` 上 ([只有一种例外情况](#####独占默认插槽的缩写语法))，这一点和已经废弃的 slot attribute 不同

##### 具名插槽相关示例代码

```html
<!-- 具名插槽 -->
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <!-- 跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header -->
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

<script>
  let baseLayout = Vue.component('base-layout', {
    template: `
      <div>
        <slot></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>
      </div>
    `,
  });
</script>
```

#### 作用域插槽

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 `<current-user>` 组件

```html
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```

我们可能想换掉备用内容，用名而非姓来显示。如下

```html
<current-user>
  {{ user.firstName }}
</current-user>
```

然而上述代码不会正常工作，**因为只有 `<current-user>` 组件可以访问到 user, 而我们提供的内容是在父级渲染的**

**为了让 user 在父级的插槽内容中可用，我们可以将 user 作为 `<slot>` 元素的一个 attribute 绑定上去**

```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

**绑定在 `<slot>` 元素上的 attribute 被称为插槽 prop。现在在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字**

##### 独占默认插槽的缩写语法

**在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 v-slot 直接用在组件上**

```html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 v-slot 被假定对应默认插槽

```html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

**注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确**

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

**只要出现多个插槽，请始终为所有的插槽使用完整的基于 `<template>` 的语法**

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

##### 作用域插槽相关示例代码

```html
<!-- 作用域插槽 -->
<!-- 只要出现多个插槽，请始终为所有的插槽使用完整的基于 <template> 的语法: -->
<current-user>
  <template v-slot:default="slotProps">
    {{slotProps.user.lastName}} 111
  </template>
  <template #other="otherSlotProps">
    {{otherSlotProps.aaa.lastName}} 111
  </template>
</current-user>

<script>
  let currentUser = Vue.component('current-user', {
    data() {
      return {
        user: {
          firstName: 'firstName',
          lastName: 'lastName',
        },
        aaa: {
          lastName: 'aaaLastName',
        },
      };
    },
    template: `
      <span>
        <slot :user="user"></slot>
        <slot :aaa="aaa" name="other"></slot>
      </span>
    `,
  });
</script>
```

#### 解构插槽 Prop

作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：

```javascript
function (slotProps) {
  // 插槽内容
}
```

**这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 (单文件组件或现代浏览器)，你也可以使用 ES2015 解构来传入具体的插槽 prop，如下**

```html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```

**这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。它同样开启了 prop 重命名等其它可能，例如将 user 重命名为 person：**

```html
<current-user v-slot="{ user: person }">
  {{ person.firstName }}
</current-user>
```

**你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：**

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

#### 动态插槽名(2.6.0 新增)

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数

```html
<!--
注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达式的约束”章节所述。
-->
<a v-bind:[attributeName]="url">...</a>
```

这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 data property attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething">...</a>
```

##### 对动态参数的值的约束

**动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告**

##### 对动态参数表达式的约束

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

**变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式**

**在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：**

```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value">...</a>
```

动态指令参数也可以用在 v-slot 上，来定义动态的插槽名：

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

#### 具名插槽的缩写(2.6.0 新增)

**跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header**

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

**然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：**

```html
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```

**如果你希望使用缩写的话，你必须始终以明确插槽名取而代之**

```html
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

#### 其它示例

**插槽 prop 允许我们将插槽转换为可复用的模板，这些模板可以基于输入的 prop 渲染出不同的内容。这在设计封装数据逻辑同时允许父级组件自定义部分布局的可复用组件时是最有用的**

例如，我们要实现一个 `<todo-list>` 组件，它是一个列表且包含布局和过滤逻辑：

```html
<ul>
  <li v-for="todo in filteredTodos" v-bind:key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

我们可以将每个 todo 作为父级组件的插槽，以此通过父级组件对其进行控制，然后将 todo 作为一个插槽 prop 进行绑定

```html
<ul>
  <li v-for="todo in filteredTodos" v-bind:key="todo.id">
    <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
    <slot name="todo" v-bind:todo="todo">
      <!-- 后备内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>
```

### 路由传参

1. 明文传参

- 优势: 页面刷新参数不会消失
- 劣势: 参数公开

```javascript
// 声明式导航
:to={name: 'CompName', query: { xxx }}
root.$route.query.xxx
```

2. 密文传参(使用了动态路由的方式, 区别是没有为 path 设置 /:xxx)

- 优势: 参数不显示
- 劣势: 页面刷新, 参数就消失

```javascript
// 声明式导航
:to={name: 'CompName', params: { xxx }}
root.$route.params.xxx
```

3. 动态路由

- 优势: 页面刷新参数不会消失
- 劣势: 需要一一配置

```javascript
// route
{
  path: 'luyou/:id/:title';
}
// 声明式导航
root.$router.push({
  path: '/luyou',
  params: {
    id,
    title,
  },
});
// 编程式导航
root.$router.push({
  path: `luyou/${id}/${title}`,
});
root.$route.params.xxx;
```

4. vuex 结合 HTML5 本地存储

- 优势: 参数不显示
- 劣势: 大材小用

5. 新窗口打开

- 优势: 参数不显示
- 劣势: 大材小用

## feature 重构点

- rem + vh/vm ?
- pug
- 第三方登录
- 测试覆盖率
- 自定义主题
- 骨架屏
- 预加载
- 获取信息列表, 使用 Rap2 做后端
- vue 组件卸载时取消函数
- nodmalize.scss
- props 解耦
- keep-alive
- onMounted() 里只请求一次
- <https://blog.csdn.net/qq_39408204/article/details/86577166>
