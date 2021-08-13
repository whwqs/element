<template>
  <ul class="el-contextmenu-listWrapper" v-show="pobj.show">
    <li v-for="item in pobj.menulists"
      class="context-menu-list"
      :key="item.btnName">
      <div v-if="item.children && item.children.length > 0" class="has-child">
        <div class="parent-name btn-wrapper-simple" :class="{'no-allow': item.disabled ? item.disabled : false}">
          <i :class="item.icoName ? item.icoName : ''" class="nav-icon-fontawe"></i>
          <span class="nav-name-right">{{item.btnName}}</span>
          <i class="icon"></i>
        </div>
        <el-contextmenu-tree :itemchildren="item.children" @childhandler="fnHandler" :float="floatDirection" />
      </div>
      <div v-else>
        <div @click.stop="item.disabled === true ? '' : fnHandler(item)"
          class="no-child-btn btn-wrapper-simple"
          :class="{'no-allow': item.disabled ? item.disabled : false}">
          <i :class="item.icoName ? item.icoName : ''" class="nav-icon-fontawe"></i>
          <span class="nav-name-right">{{item.btnName}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import ElContextmenuTree from './contextmenu-tree.vue';
  export default {
    name: 'ElContextmenu',
    components: {
      ElContextmenuTree
    },
    data() {
      return {
        floatDirection: 'float-statue-1',
        key: 'elcontextmenu'
      };
    },
    props: {
      pobj: {
        type: Object,
        required: true,
        default() {
          return {
            name: '',
            show: false,
            targetev: {},
            menulists: [
              {
                fnHandler: '',
                icoName: '',
                btnName: ''
              }
            ]
          };
        }
      }
    },
    watch: {
      pobj: {
        handler(v, old) {
          console.info(v, old);
        },
        deep: true
      },
      'pobj.name'(v, old) {
        console.info(v, old);
      }
    },
    methods: {
      fnHandler(item) {
        this.$emit(item.fnHandler);
      },
      allMenuDic() {
        return window.$(document).data(this.key);
      }
    },
    mounted() {
      if (!this.allMenuDic()) {
        window.$(document).data(this.key, {});
      }
      if (!this.pobj.name) {
        this.$destroy();
      } else {
        this.allMenuDic()[this.pobj.name] = this;
      }
    },
    beforeDestroy() {
      this.$el.parentNode.removeChild(this.$el);
      if (this.pobj.name) {
        delete this.allMenuDic()[this.pobj.name];
      }
    }
  };
</script>
