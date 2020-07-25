<!--  -->
<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide class="swiper-slide" v-for="(item,index) in banners" :key="index">
        <img :src="item.image" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "HSwiper",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    banners: {
      type: Array,
      default() {
        ["1", "2"];
      },
    },
  },
  data() {
    return {
      swiperOptions: {
        // //显示分页
        // pagination: {
        //   el: ".swiper-pagination",
        // },
        // //设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        // //自动轮播
        // autoplay: {
        //   delay: 5000,
        //   //当用户滑动图片后继续自动轮播
        //   disableOnInteraction: true,
        // },
        // //开启循环模式
        disableOnInteraction: true,
        pagination: ".swiper-pagination", // 轮播图的点
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        speed: 800,
        spaceBetween: 30,
      },
    };
  },
};
</script>
<style scoped>
</style>