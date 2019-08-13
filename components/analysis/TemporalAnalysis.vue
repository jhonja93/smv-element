<template>
  <div class="my-3">
    <h2>Temporal Analisis</h2>
    <div v-for="(viz, index) in data.viz" :key="index">
      <component v-bind:is="viz.type" :options="viz.options" :path="viz.path" :params="viz.params"></component>
      <el-divider v-if="index !== (data.viz.length - 1)"></el-divider>
    </div>
  </div>
</template>

<script>
import TimeSerie from "~/components/graphics/TimeSerie";
import { Divider } from "element-ui";
export default {
  name: "TemporalAnalisis",
  props: ["data"],
  components: {
    time_serie: TimeSerie,
    ElDivider: Divider
  },
  data() {
    return {};
  }
};
</script>

<style>
.jumbotron-heading {
  font-weight: 300;
}
</style>
