<!--  -->
<template>
  <Swiper class="detailSwiper">
    <SwiperItem v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  data() {
    return {};
  },
  props: {
    topImages: {
      type: Array,
      default: [],
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
<style scoped>
.detailSwiper {
  height: 300px;
  overflow: hidden;
}
</style>