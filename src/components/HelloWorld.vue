<template>
  <div class="hello">
    <v-count-up :startVal="0" :endVal="10000"></v-count-up>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  font-size: 20px;
  color: aquamarine;
}
</style>
