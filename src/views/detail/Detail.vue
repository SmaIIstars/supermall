<!--  -->
<template>
  <div id="detail">
    <DetailNavbar class="Navbar" @titleClick="titleClick" ref="nav"></DetailNavbar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper :topImages="topImages" v-if="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods" v-if="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop" v-if="shop"></DetailShopInfo>
      <DetaliGoodsInfo :detailInfo="detailInfo" v-if="detailInfo" @imgLoad="imgLoad"></DetaliGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" v-if="paramInfo" ref="param"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo" v-if="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommends" ref="recommend"></GoodsList>
    </Scroll>

    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShwoBackTop"></BackTop>
    <!-- <Toast :message="message" :show="show"></Toast> -->
  </div>
</template>

<script>
import DetailNavbar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetaliGoodsInfo from "./childComps/DetaliGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { mapActions } from "vuex";

export default {
  name: "Detail",

  created() {
    // 拿到传入的iid
    this.iid = this.$route.params.iid;

    // 请求数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      // console.log(data);

      // 1.获取顶部轮播图片数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo;

      // 5.保存商品参数数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.请求评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 7.获取推荐信息
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });
    this.getThemeTop = debounce(() => {
      // console.log("nextTick");

      this.themeTopYs = [];
      // 获取theme的的offsetTop
      // 数据还没有组件还没有加载则不能使用$el获取不到组件
      // 图片没加载完也不能获取真实高度
      this.themeTopYs.push(0);
      // console.log(this.$refs.param.$el.offsetTop);

      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.themeTopYs);
      this.$refs.scroll.refresh();
    }, 500);
  },
  mounted() {},
  updated() {},
  mixins: [itemListenerMixin, backTopMixin],

  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener());
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
      shop: null,
      detailInfo: null,
      paramInfo: null,
      commentInfo: null,
      recommends: [],
      themeTopYs: [],
      getThemeTop: null,
      positionY: 0,
      currentIndex: 0,
      message: "",
      show: false,
    };
  },
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetaliGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
    // Toast,
  },
  methods: {
    ...mapActions(["addCart"]),

    imgLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTop();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      // 获取值
      this.positionY = -position.y;
      // console.log(this.currentIndex);
      // console.log(this.positionY);

      // console.log(this.themeTopYs);

      // 比较相应范围
      switch (true) {
        case this.positionY > this.themeTopYs[1] &&
          this.positionY < this.themeTopYs[2]:
          this.currentIndex = 1;
          break;

        case this.positionY >= this.themeTopYs[2] &&
          this.positionY < this.themeTopYs[3]:
          this.currentIndex = 2;
          break;

        case this.positionY >= this.themeTopYs[3]:
          this.currentIndex = 3;
          break;
        default:
          this.currentIndex = 0;
      }

      this.$refs.nav.currentIndex = this.currentIndex;

      this.isShwoBackTop = -position.y > 1000;
    },
    addToCart() {
      // 1.获取购物车展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.商品添加购物车
      // 修改最好通过store里面修改，不要直接修改
      // this.$store.cartList.push(product);
      // this.$store.commit("addCart", product);

      this.addCart(product).then((res) => {
        // this.show = true
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false
        // }, 1000);
        this.$toast.show(res);
      });

      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
    },

    // Tos
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 101;
  background-color: #fff;
  height: 100vh;
}
.Navbar {
  z-index: 102;
  position: relative;
  width: 100%;
  background-color: #fff;
}
.content {
  bottom: 44px;
  height: calc(100% - 93px);
}
</style>
