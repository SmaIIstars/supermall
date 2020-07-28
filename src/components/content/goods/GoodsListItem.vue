<!--  -->
<template>
  <div class="goods-item">
    <!-- 原生元素监听图片:img.onload = function(){} -->
    <!-- Vue监听load -->
    <img :src="showImage" alt @load="imageLoad" @click="itemClick" />
    <div class="goods-info">
      <p class="title">{{ goodsItem.title }}</p>
      <div class="info-nums">
        <span class="price">{{ goodsItem.price }}</span>
        <span class="collect">
          <img src="~assets/img/common/collect.svg" alt />
          <span>{{ goodsItem.cfav }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      // 这里使用事件主线监听图片加载
      // console.log("imgeLodaGoods");
      // 用路由区分通知哪一个
      if (this.$route.path.indexOf("/home") !== -1) {
        this.$bus.$emit("HomeitemImageLoad");
      } else if (this.$route.path.indexOf("/detail") !== -1) {
        this.$bus.$emit("DetailitemImageLoad");
      }
      // this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
      // query查询
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //   }
      // });
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  }
};
</script>
<style scoped>
.goods-item {
  display: flex;
  flex-flow: column;
  width: 48%;
  /* background-color: blue; */
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  /* 不换行 */
  white-space: nowrap;
  position: relative;
  flex-flow: column;
  font-size: 13px;
  font-weight: 400;
}

.goods-info p {
  padding: 5px 4px 3px 4px;
  width: 100%;
  /* height: 14px; */
  /* line-height: 14px; */
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.info-nums {
  height: 20px;
  display: flex;
  align-items: center;
  padding-bottom: 6px;
}

.price {
  flex: 1;
  text-align: right;
  color: var(--color-high-text);
}

.collect {
  position: relative;
  flex: 1;
  top: 1px;
}
.collect img {
  position: relative;

  width: 14px;
  height: 14px;
  left: 10px;
}
.collect span {
  position: absolute;
  left: 25px;
}
</style>
