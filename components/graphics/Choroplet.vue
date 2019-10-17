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
      <div ref="map" :class="className" :style="{height:height,width:width, margin: '0 auto'}"></div>
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
  name: "Choroplet",
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
    map: { type: Object, required: true },
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
      mapJSON: null,
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
    async cargarMapa() {
      this.mapJSON = await this.$axios.$get("/maps/" + this.map.path);
    },
    handleData({ data }) {
      this.data = data;
      this.$nextTick(() => {
        this.setData();
      });
    },
    initChart() {
      this.chart = echarts.init(this.$refs.map, "shine");
      this.chart.showLoading();
    },
    dimesions() {
      return this.options.dimesions &&
        typeof this.options.dimesions === "object" &&
        this.options.dimesions.length > 1
        ? this.options.dimesions
        : ["x", "y"];
    },
    async setData() {
      if (this.chart) {
        await this.cargarMapa();

        echarts.registerMap("ChoropletMap", this.mapJSON, {
          Alaska: {
            // 把阿拉斯加移到美国主大陆左下方
            left: -131,
            top: 25,
            width: 15
          },
          Hawaii: {
            left: -110, // 夏威夷
            top: 28,
            width: 5
          }
        });

        this.chart.setOption({
          title: {
            text: "USA Population Estimates (2012)",
            subtext: "Data from www.census.gov",
            sublink: "http://www.census.gov/popest/data/datasets.html",
            left: "right"
          },
          tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function(params) {
              var value = (params.value + "").split(".");
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
              return params.seriesName + "<br/>" + params.name + ": " + value;
            }
          },
          visualMap: {
            left: "right",
            min: 500000,
            max: 38000000,
            inRange: {
              color: [
                "#313695",
                "#4575b4",
                "#74add1",
                "#abd9e9",
                "#e0f3f8",
                "#ffffbf",
                "#fee090",
                "#fdae61",
                "#f46d43",
                "#d73027",
                "#a50026"
              ]
            },
            text: ["High", "Low"], // 文本，默认为数值文本
            calculable: true
          },
          toolbox: {
            show: true,
            //orient: 'vertical',
            left: "left",
            top: "top",
            feature: {
              dataView: { readOnly: false },
              restore: {}
            }
          },
          series: [
            {
              name: "USA PopEstimates",
              type: "map",
              roam: false,
              map: "ChoropletMap",
              itemStyle: {
                emphasis: { label: { show: true } }
              },
              // 文本位置修正
              textFixed: {
                Alaska: [20, -20]
              },
              data: this.data
            }
          ]
        });
        this.chart.hideLoading();
      }
    }
  }
};
</script>

<style>
</style>
