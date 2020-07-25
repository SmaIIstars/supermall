<!--  -->
<template>
  <div id="detail">
    <DetailNavbar></DetailNavbar>
    <DetailSwiper :topImages="topImages" v-if="topImages"></DetailSwiper>
    <DetailBaseInfo :goods="goods"></DetailBaseInfo>
  </div>
</template>

<script>
import DetailNavbar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import { getDetail, Goods } from "network/detail";
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
    });
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
    };
  },
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
  },
};
</script>
<style scoped>
</style>