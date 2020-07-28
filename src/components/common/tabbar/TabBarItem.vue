<!--  -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 插槽替换，所以用一层div包裹起来，这样class不会被替换掉 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 使用父传子
  props: {
    path: {
      type: String,
      default: "",
    },
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: false
    };
  },

  computed: {
    isActive() {
      // 不等于-1表明找到了
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },

  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 13px;
  font-weight: 400;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}

.active {
  color: deeppink;
}
</style>
