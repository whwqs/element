<template>
  <ul class="child-ul-wrapper" :class="float">
    <li v-for="i in itemchildren" :key="i.name" class="child-li-wrapper">
      <div v-if="i.children && i.children.length > 0" class="has-child">
        <div class="parent-name btn-wrapper-simple">
          <i :class="i.icoName ? i.icoName : ''" class="nav-icon-fontawe"></i>
          <span class="nav-name-right">{{i.btnName}}</span>
          <i class="icon"></i></div>
          <el-contextmenu-tree :itemchildren="i.children" @childhandler="fnHandler" :float="float" />
      </div>
      <div v-else>
        <div @click.stop="fnHandler(i)" class="no-child-btn btn-wrapper-simple">
          <i :class="i.icoName ? i.icoName : ''" class="nav-icon-fontawe"></i>
          <span class="nav-name-right">{{i.btnName}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ElContextmenuTree',
  props: ['itemchildren', 'float'],
  methods: {
    fnHandler(item) {
      this.$emit('childhandler', item);
    }
  }
};
</script>
