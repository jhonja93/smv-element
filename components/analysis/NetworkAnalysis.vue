<template>
  <div>
    <el-row>
      <h2 class="analysis-title">Network Analisis</h2>
      <hr />
    </el-row>
    <el-row>
      <el-col v-for="(viz, index) in data.viz" :key="index">
        <div class="card-small mb-4 card">
          <component v-bind:is="viz.type" :options="viz.options" :map="viz.map" :path="viz.path" :params="viz.params"></component>
        </div>
        <!-- <el-divider v-if="index !== (data.viz.length - 1)"></el-divider> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Graph from "~/components/graphics/Graph";
import { Divider } from "element-ui";

export default {
  name: "NetworkAnalisis",
  props: {
    data: { type: Object, required: true }
  },
  components: {
    graph: Graph,
    ElDivider: Divider
  }
};
</script>

<style>
.jumbotron-heading {
  font-weight: 300;
}
</style>
