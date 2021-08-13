<template>
  <ul class="vue-contextmenu-listWrapper"
   
    :class="'vue-contextmenuName-' + data.menuName">
    <li v-for="item in data.menulists"
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
        floatDirection: 'float-statue-1'
      };
    },
    props: {
      data: {
        type: Object,
        required: false,
        default() {
          return {
            menuName: null,
            axis: {
              x: null,
              y: null
            },
            menulists: [
              {
                fnHandler: '',
                icoName: '',
                btnName: ''
              }
            ]
          };
        }
      },
      index: {
        type: Number,
        default: 0
      }
    },
    watch: {
      'data.axis'(ev) {
        var x = ev.x;
        var y = ev.y;
        var innerWidth = window.innerWidth;
        var innerHeight = window.innerHeight;
        var _this = this;
        var index = _this.index;
        var menuName = 'vue-contextmenuName-' + _this.data.menuName;
        var menu = document.getElementsByClassName(menuName)[index];
        menu.style.display = 'block';
        var menuHeight = this.data.menulists.length * 30;
        var menuWidth = 150;
        menu.style.top = (y + menuHeight > innerHeight ? innerHeight - menuHeight : y) + 'px';
        menu.style.left = (x + menuWidth > innerWidth ? innerWidth - menuWidth : x) + 'px';
        document.addEventListener('mouseup', function(e) {
          // 解决mac电脑在鼠标右键后会执行mouseup事件
          if (e.button === 0) {
            menu.style.display = 'none';
          }
        }, false);
        if ((x + 2 * menuWidth) > innerWidth && (y + 2 * menuHeight) > innerHeight) {
          this.floatDirection = 'float-status-4';
        }
        if ((x + 2 * menuWidth) < innerWidth && (y + 2 * menuHeight) > innerHeight) {
          this.floatDirection = 'float-status-1';
        }
        if ((x + 2 * menuWidth) > innerWidth && (y + 2 * menuHeight) < innerHeight) {
          this.floatDirection = 'float-status-3';
        }
        if ((x + 2 * menuWidth) < innerWidth && (y + 2 * menuHeight) < innerHeight) {
          this.floatDirection = 'float-status-2';
        }
      }
    },
    methods: {
      fnHandler(item) {
        this.$emit(item.fnHandler);
      }
    },
    mounted() {}
  };
</script>
