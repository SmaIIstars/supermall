<!--  -->
<template>
  <div class="goods-Info" ref="scroll">
    <div class="comment">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div
      class="show-imgs"
      v-for="(item, index) in detailInfo.detailImage[0].list"
      :key="index"
    >
      <img :src="item" alt @load="imgLoad" />
    </div>
  </div>
</template>

<script>
import { debounce } from "common/utils";
export default {
  name: "DetaliGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      count: 0,
      imgLength: this.detailInfo.detailImage[0].list.length
    };
  },
  mounted() {},
  methods: {
    imgLoad() {
      // 图片太多还是会卡顿，刷新两次性能优化
      if (
        ++this.count === this.imgLength ||
        this.count === this.imgLength / 2
      ) {
        this.$emit("imgLoad");
      }
    }
  }
};
</script>
<style scoped>
.comment {
  width: 80%;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  /* background-color: rebeccapurple; */
  margin-bottom: 10px;
}

.desc {
  font-size: 14px;
  padding: 20px 0;
}

.start,
.end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.start {
  margin-top: 10px;
  transform: scale(1, -1);
}
.end {
  float: right;
}

.start::before,
.end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.end::after {
  right: 0;
}

.show-imgs img {
  width: 100%;
}
</style>
