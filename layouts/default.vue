<template>
  <el-container>
    <el-header>
      <top-nav />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import TopNav from "./partials/TopNav";

export default {
  components: {
    TopNav
  }
};
</script>

<style>
html {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
}
</style>
