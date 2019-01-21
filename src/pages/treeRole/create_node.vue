<template>
  <transition name="slide-up">
    <ul :class="classes" v-show="visible" v-if="chooseTreeSta">
      <li>
        <div class="tree-node-line">
          <div class="action-left">
            <span :class="arrowClasses" @click="handleExpand"><Icon type="arrow-right-b"></Icon></span>
            <span :class="titleClasses" v-html="data.name" @click="handleSelect(data)"></span>
          </div>
          <div class="action-right">
            <Button class="action-button" type="text" @click="clickSelectDealerFn(data)">添加</Button>
          </div>
        </div>
        <Tree-node
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :title="item.name"
          :visible="data.expand"
          :multiple="multiple"
          :chooseTree="chooseTree"
          :show-checkbox="showCheckbox">
        </Tree-node>
      </li>
    </ul>
    <!-- <ul :class="classes" v-show="visible" v-if="chooseTreeSta">
      <li>
        <div class="tree-node-line">
          <div class="action-left">
            <span :class="arrowClasses" @click="handleExpand"><Icon type="arrow-right-b"></Icon></span>
            <span :class="titleClasses" v-html="data.name" @click="handleSelect(data)"></span>
          </div>
          <div class="action-right">
            <Button class="action-button" type="text" icon="plus-round" @click.prevent="addStucture(data)"
                    v-if="(data.has_child || data.expand)"></Button>
            <Button class="action-button" type="text" icon="edit" @click.prevent="modification(data)"></Button>
            <Button class="action-button" type="text" icon="trash-a" @click.prevent="deleteStucture(data)"></Button>
          </div>
        </div>
        <Tree-node
          v-for="item in data.children"
          :key="item"
          :data="item"
          :visible="data.expand"
          :multiple="multiple"
          :show-checkbox="showCheckbox">
        </Tree-node>
      </li>
    </ul> -->
  </transition>
</template>
<script>
  import bus from './bus.js'
  import Icon from './icon.vue'
  // import Emitter from '@/utils/emitter'

  const prefixCls = 'ivu-tree'
  //  定义一个全局的变量用来往父组件传递数据
  const currentData = {}

  export default {
    name: 'TreeNode',
    // mixins: [ Emitter ],
    components: {Icon},
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      visible: {
        type: Boolean,
        default: false
      },
      chooseTree: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        indeterminate: false
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}-children`
        ]
      },
      selectedCls () {
        return [
          {
            [`${prefixCls}-node-selected`]: this.data.selected
          }
        ]
      },
      arrowClasses () {
        return [
          `${prefixCls}-arrow`,
          {
            [`${prefixCls}-arrow-disabled`]: this.data.disabled,
            [`${prefixCls}-arrow-open`]: this.data.expand,
            [`${prefixCls}-arrow-hidden`]: !(this.data.has_child)
          }
        ]
      },
      titleClasses () {
        return [
          `${prefixCls}-title`,
          {
            [`${prefixCls}-title-selected`]: this.data.selected
          }
        ]
      },
      chooseTreeSta () {
        // console.log(this.chooseTree)
        return this.chooseTree
      }
    },
    methods: {
      // 点击项目添加门店
      clickSelectDealerFn (data) {
        console.log(data)
        bus.$emit('selectDealer', data)
      },
      handleExpand () {
        if (this.data.expand) {
          this.data.expand = false
          return
        }
        this.data.expand = true
      },
      handleSelect (data) {
        currentData.action = 'handleSelect'
        currentData.data = data
        bus.$emit('treeSendMsg', currentData)
      },
      handleCheck () {
      }
    },
    created () {
    },
    mounted () {
      // debugger
      // console.log(this.chooseTree)
    }
  }
</script>

<style lang="less" scoped>
  .tree-node-line {
    height: 25px;
    line-height: 25px;
    display: flex;
    justify-content: space-between;
  }

  .action-left {
    display: inline-block;
  }

  .action-right {
    display: none;
  }

  .tree-node-line:hover {
    background-color: #ebf7ff;
    .action-right {
      display: inline-block;
    }
  }
  .action-button {
    color: #0f70e7;
    padding: 0px;
    margin: 0 4px;
    &:last-of-type {
      color: #0f70e7;
    }
  }
</style>
