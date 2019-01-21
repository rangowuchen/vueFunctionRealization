<template>
  <transition name="slide-up">
    <ul :class="classes" v-show="visible">
      <li>
        <div class="tree-node-line" :id="data.id">
          <div class="action-left">
            <span :class="arrowClasses" @click="handleExpand"><Icon type="arrow-right-b"></Icon></span>
            <!--<Checkbox-->
            <!--v-if="showCheckbox"-->
            <!--:value="data.checked"-->
            <!--:disabled="data.disabled || data.disableCheckbox"-->
            <!--@click.native.prevent="handleCheck"></Checkbox>-->
            <span :class="titleClasses" v-html="data.name" @click="handleSelect(data)"></span>
          </div>
          <div class="action-right">
            <Button class="action-button" type="text" icon="plus-round" @click.prevent="addStucture(data)"
                    ></Button>
            <Button class="action-button" type="text" icon="edit" @click.prevent="modification(data)"
                    ></Button>
            <Button class="action-button" type="text" icon="trash-a" @click.prevent="deleteStucture(data)"
                    ></Button>
            <!--<button @click.prevent="addStucture(data)">增加</button>-->
            <!--<button @click.prevent="modification(data)">修改</button>-->
            <!--<button @click.prevent="deleteStucture(data)">删除</button>-->
          </div>
        </div>
        <Tree-node
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :visible="data.expand"
          :multiple="multiple"
          :show-checkbox="showCheckbox">
        </Tree-node>
      </li>
    </ul>
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
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        indeterminate: false,
        current_select_id: ''
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
      permissionData () {
        return this.$store.state.permissionData
      }
    },
    methods: {
      // 修改
      modification (data) {
        currentData.action = 'modification'
        currentData.data = data
        bus.$emit('treeSendMsg', currentData)
      },
      // 增加
      addStucture (data) {
        currentData.action = 'addStucture'
        currentData.data = data
        bus.$emit('treeSendMsg', currentData)
      },
      // 删除
      deleteStucture (data) {
        currentData.action = 'deleteStucture'
        currentData.data = data
        bus.$emit('treeSendMsg', currentData)
      },
      // 点击选择
      handleSelect (data) {
        currentData.action = 'handleSelect'
        currentData.data = data
        bus.$emit('treeSendMsg', currentData)
        // 以下是样式设置
        this.setActiveStyle(data.id)
      },
      setActiveStyle (data) {
        this.current_select_id = data
        let treeNodeLineActive = document.getElementsByClassName('tree-node-line-active')
        if (treeNodeLineActive.length !== 0) {
          for (let i in treeNodeLineActive) {
            if (treeNodeLineActive[i]) {
              treeNodeLineActive[i].className = 'tree-node-line'
            }
          }
        }
        let currentSelectId = document.getElementById(this.current_select_id)
        currentSelectId.className = 'tree-node-line tree-node-line-active'
      },
      handleExpand () {
        if (this.data.expand) {
          this.data.expand = false
          return
        }
        this.data.expand = true
      },
      handleCheck () {
      }
    },
    created () {
    },
    mounted () {
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

  .tree-node-line-active {
    background-color: #ebf7ff;
    .action-right {
      display: inline-block;
    }
  }

  .action-button {
    color: rgb(113, 179, 245);
    padding: 0px;
    margin: 0 4px;
    &:last-of-type {
      color: rgb(255, 121, 103);
    }
  }
</style>
