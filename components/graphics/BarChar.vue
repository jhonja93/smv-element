<template>
  <div class="p-3">
    <div class="filters">
      <el-select v-if="groups.length" v-model="dataFilters.type" placeholder="Select">
        <el-option v-for="item in groups" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker
        v-if="filters['date']"
        v-model="dataFilters.range"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>
    <graphic :path="path" :params="{...params, filters: dataFilters}" type="text" @success="handleData">
      <div ref="barchar" :class="className" :style="{height:height,width:width, margin: '0 auto'}"></div>
    </graphic>
  </div>
</template>

<script>
const echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/bar");
require("echarts/lib/component/title");
require("echarts/theme/shine"); // echarts theme

import resize from "~/mixins/resize";
import Graphic from "~/components/renderless/Graphic";
import { DatePicker } from "element-ui";
import { parseTime, fecha_ayer } from "~/utils";

export default {
  name: "BarChar",
  mixins: [resize],
  components: {
    Graphic,
    ElDatePicker: DatePicker
  },
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "700px"
    },
    height: {
      type: String,
      default: "500px"
    },
    options: {
      type: Object,
      default: () => ({})
    },
    filters: {
      type: Object,
      default: () => ({})
    },
    path: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    groups: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  data() {
    return {
      chart: null,
      dataFilters: {
        range: this.filters["date"]
          ? [fecha_ayer(), parseTime(new Date())]
          : null,
        type: null
      },
      data: null,
      key: 0
    };
  },
  methods: {
    handleData({ data }) {
      this.data = data;
      this.$nextTick(() => {
        this.setData();
      });
    },
    initChart() {
      this.chart = echarts.init(this.$refs.barchar, "shine");
      this.chart.showLoading();
    },
    dimesions() {
      return this.options.dimesions &&
        typeof this.options.dimesions === "object" &&
        this.options.dimesions.length > 1
        ? this.options.dimesions
        : ["x", "y"];
    },
    setData() {
      if (this.chart) {
        this.chart.setOption({
          title: {
            text: this.options.title,
            left: "center",
            right: "center",
            textStyle: {
              color: "#00000073",
              width: "100%",
              fontSize: 14,
              fontWeight: "bold",
              lineHeight: 18,
              width: "100%"
            }
          },
          xAxis: {
            type: "category",
            name: this.options.xlabel,
            nameLocation: "center",
            nameGap: 30
          },
          yAxis: {
            type: "value",
            name: this.options.ylabel,
            nameLocation: "center",
            nameGap: 30
          },
          dataset: {
            dimesions: [this.dimesions()],
            source: this.data
          },
          series: [{ type: "bar" }]
        });
        this.chart.hideLoading();
      }
    }
  }
};
</script>

<style>
</style>
