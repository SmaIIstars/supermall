<!--  -->
<template>
  <div class="goods">
    <div v-for="(item, index) in subCategories" :key="index" class="goods-info">
      <img :src="item.image" alt />
      <span class="title">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subCategories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods {
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.goods-info {
  margin: 20px 0;
  display: flex;
  flex-flow: column;
}

.goods-info img {
  width: 74px;
  height: 74px;
  border-radius: 50%;
}
.title {
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
}
</style>