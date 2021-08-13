import ElContextmenu from './src/contextmenu.vue';

ElContextmenu.install = function(Vue) {
  Vue.component(ElContextmenu.name, ElContextmenu);
};

export default ElContextmenu;
