<template>
  <div class="p-3">
    <!-- <div class="filters">
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
    </div>-->
    <graphic :path="path" :params="{...params, dataFilters}" type="geo" @success="handleData">
      <div ref="heatmap" :class="className" :style="{height:height,width:width}"></div>
    </graphic>
  </div>
</template>

<script>
const echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/heatmap");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/theme/shine"); // echarts theme
// require('echarts/extension/bmap/bmap');
import "echarts-leaflet";
import resize from "~/mixins/resize";
import Graphic from "~/components/renderless/Graphic";
import { DatePicker } from "element-ui";
import { getTime, parseTime, fecha_ayer } from "~/utils";

export default {
  name: "HeatMap",
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
      default: "100%"
    },
    height: {
      type: String,
      default: "450px"
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
  mixins: [resize],
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
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    handleData({ data }) {
      this.data = [].concat.apply(
        [],
        data.map(function(track) {
          return track.map(function(seg) {
            return seg.coord.concat([1]);
          });
        })
      );
      this.$nextTick(() => {
        this.setData();
      });
    },
    initChart() {
      this.chart = echarts.init(this.$refs.heatmap, "shine");
      this.chart.showLoading();
    },
    dimesions() {
      return this.options.dimesions &&
        typeof this.options.dimesions === "object" &&
        this.options.dimesions.length > 1
        ? this.options.dimesions
        : ["date", "value"];
    },
    setData() {
      if (this.chart) {
        this.chart.setOption({
          animation: false,
          leaflet: {
            center: [120.13066322374, 30.240018034923],
            zoom: 14,
            roam: true,
            tiles: [
              {
                label: "OpenStreetMap",
                urlTemplate:
                  "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
                options: {
                  attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                }
              }
            ]
          },
          visualMap: {
            show: false,
            top: "top",
            min: 0,
            max: 5,
            seriesIndex: 0,
            calculable: true,
            inRange: {
              color: ["blue", "blue", "green", "yellow", "red"]
            }
          },
          series: [
            {
              type: "heatmap",
              coordinateSystem: "leaflet",
              data: this.data,
              pointSize: 5,
              blurSize: 6
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
.filters {
  display: flex;
}
.filters .el-date-editor {
  margin-left: auto;
}
</style>
