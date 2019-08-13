<template>
  <nuxt-link :to="{name: 'casos-id', params: {id: caso._id, caso}}">
    <div class="caso">{{ caso.name }}</div>
  </nuxt-link>
</template>

<script>
// const randomColor = require('randomcolor')
import slugify from 'slugify'

export default {
  name: 'Caso',
  props: {
    caso: { type: Object, required: true }
  },
  computed: {
    path() {
      return '/'+slugify(this.caso.name.toLowerCase());
    }
  },
  methods: {
    randomColor() {
      return randomColor({
        count: 10,
        hue: 'yellow'
      })
    },
    slugify(val) {
      return slugify(val)
    }
  }
}
</script>

<style>
.caso {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 200px;
  height: 150px;
  margin: 0 auto;
  cursor: pointer;
  background-color: #dcdcdc;
  color: black;
  border-radius: 5px;
  transition: all 0.1s ease-in;
}
.caso:hover {
  box-shadow: 2px 2px #424242;
  font-size: 16px;
}
</style>
