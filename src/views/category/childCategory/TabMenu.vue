<!--  -->
<template>
  <div>
    <Scorll :probeType="3" class="content">
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="menu-title"
        @click="itemClick(index)"
        :class="{active: index === currentIndex}"
      >{{item.title}}</div>
    </Scorll>
  </div>
</template>

<script>
import Scorll from "components/common/scroll/Scroll";

export default {
  name: "TabMenu",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    categories: {
      type: Array,
      default: null,
    },
  },
  components: {
    Scorll,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
  },
};
</script>
<style scoped>
.content {
  height: calc(100vh - 43px - 49px);
}

.menu-title {
  text-align: center;
  height: 44px;

  line-height: 44px;
  font-size: 16px;
  background-color: #eaeaea;
}
.active {
  background-color: white;
}
</style>