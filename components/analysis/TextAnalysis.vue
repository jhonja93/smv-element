<template>
  <div>
    <el-row>
      <h2 class="analysis-title">Text Analisis</h2>
      <hr />
    </el-row>
    <el-row>
      <el-col v-for="(viz, index) in data.viz" :key="index">
        <component
          v-bind:is="viz.type"
          :options="viz.options"
          :filters="viz.filters"
          :path="viz.path"
          :params="viz.params"
        ></component>
        <el-divider v-if="index !== (data.viz.length - 1)"></el-divider>
      </el-col>
    </el-row>
  </div>
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
