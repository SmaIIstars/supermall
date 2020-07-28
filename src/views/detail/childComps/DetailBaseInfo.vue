<!--  -->
<template>
  <div v-if="goods" class="base-info">
    <div class="base-info-title">{{goods.title}}</div>
    <div class="base-info-price">
      <div class="n-price">{{goods.newPrice}}</div>
      <div class="o-price">{{goods.oldPrice}}</div>
      <div class="discount" v-if="goods.discount">{{goods.discount}}</div>
    </div>
    <div class="base-info-other">
      <div v-if="goods.columns[0]">{{goods.columns[0]}}</div>
      <div v-if="goods.columns[1]">{{goods.columns[1]}}</div>
      <div>{{goods.services[goods.services.length-1].name}}</div>
    </div>
    <div class="info-service">
      <div class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
};
</script>
<style scoped>
.base-info {
  display: flex;
  flex-flow: column;
  /* position: relative; */
  margin-top: 15px;

  color: #999;
  border-bottom: 4px solid #f2f5f8;
}
.base-info-title {
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 97%;
  padding: 0 5px 10px 5px;
  font-size: 15px;
  font-weight: 550;
  color: #222;
}
.base-info-price {
  display: flex;

  /* background-color: red; */
}
.n-price {
  padding-left: 10px;
  font-size: 22px;
  color: var(--color-high-text);
}
.o-price {
  margin-left: 5px;
  font-size: 12px;
  text-decoration: line-through;
  padding-top: 8px;
  /* background-color: red; */
}
.discount {
  margin-left: 5px;
  position: relative;
  left: 3px;
  top: 3px;
  text-align: center;
  height: 15px;
  font-weight: 200;
  color: #fff;
  border-radius: 8px;
  background-color: var(--color-tint);
  font-size: 10px;
  padding: 0 4px;
}

.base-info-other {
  padding: 0 8px;
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
}
.info-service {
  padding: 10px 8px;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  color: #222;
}
.info-service img {
  width: 10px;
  height: 10px;
}
</style>