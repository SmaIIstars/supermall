<!--  -->
<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";

import { getHomeMultidata } from "network/home";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners: [],
      dKeyword: [],
      keywords: [],
      recommends: []
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata()
      .then(res => {
        this.banners = res.data.data.banner.list;

        this.dKeyword = res.data.data.dKeyword.list;
        this.keywords = res.data.data.keywords.list;
        this.recommends = res.data.data.recommend.list;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
}
</style>
