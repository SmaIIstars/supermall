<!--  -->
<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>

      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          @click="titleClick(index)"
          :class="{active: currentIndex === index}"
        >{{item}}</div>
      </div>

      <div>1</div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",

  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
      // this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.title {
  display: flex;
  flex-flow: row;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>