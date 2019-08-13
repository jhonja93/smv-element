<template>
  <div class="p-3">
    <div class="filters">
      <el-select v-if="groups.length" v-model="filters.type" placeholder="Select">
        <el-option v-for="item in groups" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker
        v-model="filters.range"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>
    <graphic :path="path" :params="{...params, filters}" type="temporal" @success="handleData">
      <div ref="chart" :class="className" :style="{height:height,width:width}"></div>
    </graphic>
  </div>
</template>

<script>
const echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/theme/shine"); // echarts theme

import resize from "~/mixins/resize";
import Graphic from "~/components/renderless/Graphic";
import { DatePicker } from "element-ui";

export default {
  name: "TimeSerie",
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
      filters: {
        range: [this.fecha_ayer(), this.formatDate(new Date())],
        type: null
      },
      data: null,
      key: 0
    };
  },
  mounted() {
    // this.$nextTick(() => {
    this.initChart();
    // });
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
      this.data = data;
      this.$nextTick(() => {
        this.setData();
      });
    },
    fecha_ayer() {
      var dt = new Date();
      dt.setDate(dt.getDate() - 1);
      return this.formatDate(dt);
    },
    formatDate(date) {
      //buscamos la posición de la fecha dentro de nuestro arreglo de selección
      let newdate = new Date(date),
        month = "" + (newdate.getMonth() + 1),
        day = "" + newdate.getDate(),
        year = newdate.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      //reescribimos el valor por el nuevo formateado en yyyy-mm-dd
      return [year, month, day].join("-");
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, "shine");
      this.chart.showLoading();
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
          grid: {
            bottom: 90
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          dataset: {
            dimesions: ["date", "value"],
            source: []
          },
          dataset: {
            source: this.data
          },
          dataZoom: [
            {
              show: this.options.zoom ? true : false,
              realtime: true,
              start: 65,
              end: 85
            },
            {
              type: "inside",
              realtime: true,
              start: 65,
              end: 85
            }
          ],
          xAxis: {
            type: "time",
            boundaryGap: false,
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
          series: [
            {
              type: "line",
              animationDuration: 4000
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
