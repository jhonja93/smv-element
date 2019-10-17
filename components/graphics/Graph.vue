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
        <div class="block">
            <el-slider v-model="zoom"></el-slider>
        </div>
        <client-only placeholder="Cargando...">
            <graphic :path="path" type="text" @success="handleData">
                <d3-network :net-nodes="data.nodes" :net-links="data.links" :options="opciones" />
            </graphic>
        </client-only>
    </div>
</template>

<script>
// const echarts = require("echarts/lib/echarts");

// require("echarts/lib/chart/bar");
// require("echarts/lib/component/title");
// require("echarts/theme/shine"); // echarts theme
import D3Network from "vue-d3-network";
import resize from "~/mixins/resize";
import Graphic from "~/components/renderless/Graphic";
import { DatePicker } from "element-ui";
import { parseTime, fecha_ayer } from "~/utils";

export default {
    name: "Graph",
    mixins: [resize],
    components: {
        Graphic,
        ElDatePicker: DatePicker,
        D3Network
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
    computed: {
        opciones() {
            return {
                force: this.zoom * 30,
                nodeSize: 20,
                nodeLabels: true,
                linkWidth: 5,
                ...this.options
            };
        }
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
            data: { nodes: [], links: [] },
            key: 0,
            zoom: 50
        };
    },
    methods: {
        handleData({ data }) {
            this.data = data;
        }
    }
};
</script>

<style>
</style>
