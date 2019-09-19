<template>
  <div>
    <el-row>
      <h2 class="analysis-title">Temporal Analisis</h2>
      <hr />
    </el-row>
    <el-row>
      <el-col v-for="(viz, index) in data.viz" :key="index">
        <div class="card-small mb-4 card">
          <component
            v-bind:is="viz.type"
            :options="viz.options"
            :path="viz.path"
            :params="viz.params"
          ></component>
        </div>
        <!-- <el-divider v-if="index !== (data.viz.length - 1)"></el-divider> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TimeSerie from "~/components/graphics/TimeSerie";
import { Divider } from "element-ui";
export default {
  name: "TemporalAnalisis",
  props: {
    data: { type: Object, required: true }
  },
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
