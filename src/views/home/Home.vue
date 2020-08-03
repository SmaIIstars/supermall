<!--  -->
<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>

    <TabControl
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></TabControl>

    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" v-if="banners" @siwperImageLoad="siwperImageLoad" />
      <recommend-view :recommends="recommends" />
      <FeatureView></FeatureView>
      <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShwoBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
// import HSwiper from "./HSwiper";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

export default {
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mixins: [itemListenerMixin, backTopMixin],

  mounted() {
    // 在created中$refs可能为空
    // 1.监听GoodsListItem中图片加载完成
    // const drefresh = debounce(this.$refs.scroll.refresh, 100);
    // this.$bus.$on("itemImageLoad", () => {
    //   drefresh();
    // });
    // 2.使用混入方法实现
  },
  activated() {
    // 激活的时候回到savaY的地方
    this.$refs.scroll.refresh();

    this.$refs.scroll.scrollTo(0, this.saveY, 0);

    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 走的时候记录savaY
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局监听事件
    this.$bus.$off("itemImgLoad", this.itemImgListener());
  },
  components: {
    HomeSwiper,
    RecommendView,
    // HSwiper,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      dKeyword: [],
      keywords: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata()
        .then((res) => {
          this.banners = res.data.data.banner.list;

          this.dKeyword = res.data.data.dKeyword.list;
          this.keywords = res.data.data.keywords.list;
          this.recommends = res.data.data.recommend.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },

    // 事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";

          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShwoBackTop = -position.y > 1000;

      // 2.判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 解决滚动区域更新的问题
      this.$refs.scroll.refresh();
    },

    // 2.获取tabControl的offsetTop
    // 所有组件都有属性$el，用于获取组件中的元素
    siwperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
  /* bottom: 90px; */
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  width: 100%;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
}

.content {
  position: absolute;
  width: 100%;
  height: 87%;
  top: 43px;
  overflow: hidden;
  /* margin-top: 44px; */
  /* height: calc(100% - 93px); */
}
.tab-control {
  position: relative;
  z-index: 9;
  top: -2px;
}
</style>
