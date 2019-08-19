<template>
  <div class="p-3">
    <graphic :path="path" :params="{...params, dataFilters}" type="geo" @success="handleData">
      <div ref="map" style="height:400px"></div>
    </graphic>
  </div>
</template>

<script>
import L from "leaflet";
import "./leaflet-heat";
import Graphic from "~/components/renderless/Graphic";
import { DatePicker } from "element-ui";
import { getTime, parseTime, fecha_ayer } from "~/utils";

export default {
  name: "HeatMap",
  components: {
    ElDatePicker: DatePicker,
    Graphic
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
  data() {
    return {
      map: null,
      chart: null,
      dataFilters: {
        range: this.filters["date"]
          ? [fecha_ayer(), parseTime(new Date())]
          : null,
        type: null
      },
      data: null,
      key: 0,
      center: [30.240018034923, 120.13066322374]
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {},
  methods: {
    handleData({ data }) {
      this.data = [].concat.apply(
        [],
        data.map(function(track) {
          return track.map(function(seg) {
            return seg.coord.reverse().concat([1]);
          });
        })
      );

      var heat = L.heatLayer(this.data);
      this.map.addLayer(heat);
    },
    initChart() {
      this.map = L.map(this.$refs.map).setView(this.center, 12);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      });
    },
    dimesions() {
      return this.options.dimesions &&
        typeof this.options.dimesions === "object" &&
        this.options.dimesions.length > 1
        ? this.options.dimesions
        : ["date", "value"];
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
