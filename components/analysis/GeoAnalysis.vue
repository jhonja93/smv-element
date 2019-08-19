<template>
  <div class="my-3">
    <h2>Geographical Analisis</h2>
    <div v-for="(viz, index) in data.viz" :key="index">
      <component v-bind:is="viz.type" :options="viz.options" :map="viz.map" :path="viz.path" :params="viz.params"></component>
      <el-divider v-if="index !== (data.viz.length - 1)"></el-divider>
    </div>
  </div>
</template>

<script>
import HeatMap from "~/components/graphics/HeatMap";
import Choroplet from "~/components/graphics/Choroplet";
import { Divider } from "element-ui";
export default {
  name: "GeoAnalisis",
  props: {
      data: {type: Object, required: true}
  },
  components: {
    heatmap: HeatMap,
    ElDivider: Divider,
    choroplet: Choroplet
  }
};
</script>

<style>
.jumbotron-heading {
  font-weight: 300;
}
</style>
