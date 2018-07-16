<template>
  <div>
    <!-- 例子：https://codesandbox.io/s/j23p2opkk3 -->
    <div class="color-header">
      <Icon :color="selected" style="width: auto;">
        vue-js-grid
      </Icon>
    </div>
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="colors"
      :height="80"
      :width="80"
      @change="change"
      @remove="remove"
      @click="click"
      @sort="sort">
      <template slot="cell" slot-scope="props">
        <Icon :color="props.item"
              :index="props.index"
              :with-button="true"
              @remove="props.remove()"/>
      </template>
    </grid>
  </div>

</template>

<script>
import Icon from '../components/Icon.vue'
import { generateRGBColors } from '../libs/utils.js'
export default {
  name: 'app',
  components: {
    Icon
  },
  data () {
    let colors = generateRGBColors(20)
    return {
      colors,
      selected: null
    }
  },
  methods: {
    click ({ items, index }) {
      let value = items.find(v => v.index === index)
      this.selected = value.item
      console.log(this.selected)
    },
    change (event) {
      console.log('change', event)
    },
    remove (event) {
      console.log('remove', event)
    },
    sort (event) {
      console.log('sort', event)
    }
  }
}
</script>

<style>
body {
  background: #fafafa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.color-header {
  position: relative;
  padding: 10px 0;
  box-sizing: border-box;
}
</style>