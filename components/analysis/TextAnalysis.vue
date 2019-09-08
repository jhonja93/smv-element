<template>
  <el-row :gutter="20">
    <el-col>
      <h2>TextAnalysis</h2>
      <div v-for="(viz, index) in data.viz" :key="index">
        <component
          v-bind:is="viz.type"
          :options="viz.options"
          :filters="viz.filters"
          :path="viz.path"
          :params="viz.params"
        ></component>
        <el-divider v-if="index !== (data.viz.length - 1)"></el-divider>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import WordCloud from "~/components/graphics/WordCloud";
import BarChar from "~/components/graphics/BarChar";
export default {
  name: "TextAnalysis",
  props: ["data"],
  components: {
    wordcloud: WordCloud,
    barchar: BarChar
  }
};
</script>

<style>
</style>
