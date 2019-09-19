<template>
  <el-container class="layout-container flex justify-center">
    <div class="vertical-nav">
      <div class="sidebar-mask"></div>
      <div class="sidebar flex column pos-left">
        <div class="box-logo flex align-center">
          <nuxt-link :to="{path: '/'}" class="app-name">Social Media Viewer</nuxt-link>
        </div>
        <div class="box-nav box grow">
          <div class="scroll-nav vb vb-invisible">
            <div
              class="vb-content"
              style="display: block; overflow: hidden scroll; height: 100%; width: 100%;"
            >
              <sidebar-content></sidebar-content>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-container class="container flex column box grow">
      <el-header class="header">
        <div class="toolbar flex align-center justify-space-between">
          <div class="box-left box grow flex"></div>
          <div class="toggle-sidebar card-base card-shadow--small"></div>
        </div>
        <!-- <top-nav /> -->
      </el-header>
      <el-main class="ps-container main box grow flex">
        <!-- <el-button
          class="btn-back"
          v-if="$route.path !== '/'"
          @click="$router.back()"
          icon="el-icon-back"
          circle
        /> -->
        <section class="page-crypto-dashboard view box grow">
          <nuxt />
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SidebarContent from "./partials/SidebarContent";
import PerfectScrollbar from "perfect-scrollbar";

export default {
  components: {
    SidebarContent
  },
  data() {
    return {
      ps: null
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.ps = new PerfectScrollbar(".ps-container", {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
      });
    });
  },
  destroyed() {
    this.ps.destroy();
    this.ps = null;
  }
};
</script>

<style>
html,
body {
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
#__layout {
  font-family: Nunito Sans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.4;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  background: #87afcd;
  color: #f5f6f8;
}
.flex.justify-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.layout-container {
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  background: #f3f7fa;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  --flex-grid: 12;
}
.flex.justify-space-between {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.flex.align-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.toolbar {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.vertical-nav {
  height: 100%;
  padding: 10px;
  background: #fff;
  box-shadow: 0 0.125rem 9.375rem rgba(90, 97, 105, 0.1),
    0 0.25rem 0.5rem rgba(90, 97, 105, 0.12),
    0 0.9375rem 1.375rem rgba(90, 97, 105, 0.1),
    0 0.4375rem 2.1875rem rgba(165, 182, 201, 0.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
}
.flex.column {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.layout-container .container {
  overflow: hidden;
}
html:not(.ie) .layout-container .container {
  max-width: 1920px;
}
.layout-container .container .header {
  height: 60px;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
}
.flex > .box.grow {
  -webkit-box-flex: 1;
  -ms-flex: 1 0;
  flex: 1 0;
}
.container .main {
  position: relative;
  overflow: hidden;
  padding: 0 30px;
}
.layout-container .container .main {
  position: relative;
  overflow: hidden;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}
.vertical-nav .sidebar-mask {
  visibility: hidden;
  opacity: 0;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.vertical-nav .sidebar {
  width: 230px;
  height: 100%;
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
}
.box-logo {
  height: 60px;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 19px;
  font-weight: 700;
  position: relative;
  color: #424242;
  text-shadow: 0 0 1px #f3f7fa, 0 0 1px #f3f7fa, 0 0 1px #f3f7fa,
    0 0 1px #f3f7fa, 0 0 1px #f3f7fa, 0 0 1px #f3f7fa, 0 0 1px #f3f7fa,
    0 1px 2px rgba(0, 0, 0, 0.3), 0 3px 9px rgba(0, 0, 0, 0.1);
}
.box-logo .app-name {
  cursor: pointer;
}
.vertical-nav .sidebar .box-nav {
  overflow: hidden;
  padding-top: 15px;
  border-right: 1px solid gainsboro;
}
.vertical-nav .sidebar .box-nav .scroll-nav {
  height: 100%;
}
.vertical-nav .sidebar:not(.pos-right) .box-nav .scroll-nav.vb > .vb-content {
  margin-left: 4px;
}
.ps-container {
  position: relative;
}
.ps {
  overflow: hidden !important;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
  -ms-touch-action: auto;
}
.ps--active-x > .ps__rail-x,
.ps--active-y > .ps__rail-y {
  display: block;
  background-color: transparent;
}
.ps > .ps__rail-y,
.ps > .ps__scrollbar-y-rail {
  width: 12px !important;
}
.ps__rail-y {
  width: 15px;
  right: 0;
}
.ps__rail-x,
.ps__rail-y {
  display: none;
  /* opacity: 0; */
  transition: background-color 0.2s linear, opacity 0.2s linear;
  -webkit-transition: background-color 0.2s linear, opacity 0.2s linear;
  position: absolute;
}
.ps__thumb-x,
.ps__thumb-y {
  background-color: #aaa;
  border-radius: 6px;
  position: absolute;
}
.ps > .ps__rail-y > .ps__thumb-y,
.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y {
  right: 0 !important;
  background-color: rgba(74, 89, 106, 0.3) !important;
  -webkit-transition: width 0.5s, -webkit-transform 0.5s !important;
  transition: width 0.5s, -webkit-transform 0.5s !important;
  transition: width 0.5s, transform 0.5s !important;
  transition: width 0.5s, transform 0.5s, -webkit-transform 0.5s !important;
  -webkit-transform: translateX(-4px) !important;
  transform: translateX(-4px) !important;
  width: 4px !important;
}
.layout-container .container .view {
  padding-bottom: 10px;
  padding-top: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.btn-back {
  position: absolute;
  top: 0;
  z-index: 10;
  left: 0px;
}
.analysis-title {
  color: #949799;
  text-align: right;
  margin: 5px 0px;
}
.row {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.card {
  position: relative;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.card-small {
  background: white;
  padding: 10px;
  color: #949799;
  text-align: right;
  margin: 10px 0px;
  border: none;
  border-radius: 0.625rem;
  /* box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
    0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1); */
}
</style>
