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
      <div ref="wordcloud" :class="className" :style="{height:height,width:width, margin: '0 auto'}"></div>
    </graphic>
  </div>
</template>

<script>
const echarts = require("echarts");

import resize from "~/mixins/resize";
import Graphic from "~/components/renderless/Graphic";
import { DatePicker } from "element-ui";
import { parseTime, fecha_ayer } from "~/utils";

export default {
  name: "WordCloud",
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
    require("echarts-wordcloud");
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
      this.chart = echarts.init(this.$refs.wordcloud, "shine");
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
          left: "center",
          top: "center",
          right: null,
          bottom: null,
          series: [
            {
              type: "wordCloud",

              // The shape of the "cloud" to draw. Can be any polar equation represented as a
              // callback function, or a keyword present. Available presents are circle (default),
              // cardioid (apple or heart shape curve, the most known polar equation), diamond (
              // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

              shape: "circle",

              // A silhouette image which the white area will be excluded from drawing texts.
              // The shape option will continue to apply as the shape of the cloud to grow.

              // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
              // Default to be put in the center and has 75% x 80% size.

              left: "center",
              top: "center",
              width: "70%",
              height: "80%",
              right: null,
              bottom: null,

              // Text size range which the value in data will be mapped to.
              // Default to have minimum 12px and maximum 60px size.

              sizeRange: [12, 60],

              // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

              rotationRange: [-90, 90],
              rotationStep: 45,

              // size of the grid in pixels for marking the availability of the canvas
              // the larger the grid size, the bigger the gap between words.

              gridSize: 8,

              // set to true to allow word being draw partly outside of the canvas.
              // Allow word bigger than the size of the canvas to be drawn
              drawOutOfBound: false,

              // Global text style
              textStyle: {
                normal: {
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  // Color can be a callback function or a color string
                  color: function() {
                    // Random color
                    return (
                      "rgb(" +
                      [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                      ].join(",") +
                      ")"
                    );
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: "#333"
                }
              },

              // Data is an array. Each array item must have name and value property.
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
