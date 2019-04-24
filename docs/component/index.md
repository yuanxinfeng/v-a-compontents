# 组件

## count-up

### 使用
::: tip
这个组件是借鉴的count-up的vue版本
:::

在需要的页面直接引用
```html
    <v-a-count-up :startVal="0" :endVal="10000"></v-a-count-up>
```

### 配置（props）

|    Property   |  Description    |     type      | default | required |
| ------------- |:---------------:|:-------------:|:-------:|:--------:|
| startVal      | the startval    |     Number    |     0   |   true   |
| endVal        |  the endVal     |     Number    |   2019  |   true   |
| duration      |      持续时间    |     Number    |  3000    |  false   |
| autoplay      |   是否自动播放    |    Boolean    |   true   |  false   |
| decimals      | 保留几位小数      |     Number    |    0     |  false   |
| decimal       |  隔离小数的方式   |     String    |    .      |  false  |
| separator     |      分隔符      |     String    |    ,      |  false   |
| prefix        |       前缀       |     String    |    ""     |  false  |
| suffix        |       后缀       |     String    |    ""     |  false  |
| useEasing     |  是否使用动画函数  |     Boolean   |    true   |  false  |
| easingFn      |      动画函数     |     Function  |    -      |  false   |


## verify-code
::: tip
这是一个验证码的组件，采用canvas编写 从1-0-a-z
:::
在需要的页面直接引用
```html
    <v-a-verify-code></v-a-verify-code>
```
|    Property    |    type    |   default   |   required |
| -------------- |:----------:|:-----------:|:----------:|
|  contentWidth  |    Number  |     110     |   false    |
|  contentHeight |    Number  |     40      |   false    |


## v-charts
::: tip
这是一个封装了echarts的组件，api全是使用的echarts，这里只是简单的封装一下，option还是需要自己去配置
:::
在需要的页面直接引用
```html
<template>
  <div>
    <v-a-charts :setOption="option"></v-a-charts>
  </div>
</template>
```
```js
<script>
export default {
  name: "name",
  props: {
    msg: String
  },
  data() {
    return {
      option: option
    };
  }
};
</script>
```