<!--  -->
<template>
  <div>
    <div class="shop-info">
      <div class="shop-top">
        <img :src="shop.logo" alt />
        <span class="shop-name">{{shop.name}}</span>
      </div>
      <div class="shop-middle">
        <div class="shop-middle-left">
          <div class="info-sells">
            <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
            <div class="sells-text">总销量</div>
          </div>
          <div class="info-goods">
            <div class="sells-goods">{{shop.goodsCount}}</div>
            <div class="sells-text">全部宝贝</div>
          </div>
        </div>
        <div class="shop-middle-right">
          <div class="table">
            <div v-for="(item,index) in shop.score" :key="index" class="table-item">
              <div>{{item.name}}</div>
              <div class="score" :class="{'score-better':item.isBetter}">{{item.score}}</div>
              <div
                class="better"
                :class="{'better-more':item.isBetter}"
              >{{item.isBetter | betterFilter}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="shop-bottom">
        <button class="bottom-btn">进店逛逛</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  data() {
    return {};
  },
  props: {
    shop: {
      type: Object,
      default: {},
    },
  },
  filters: {
    sellCountFilter(value) {
      // toFixed保留几位
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
    betterFilter(isBetter) {
      return isBetter ? "高" : "低";
    },
  },
};
</script>
<style scoped>
.shop-info {
  /* height: 400px; */
  border-bottom: 4px solid #f2f5f8;
}
.shop-top {
  margin-top: 10px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
}
.shop-info img {
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.shop-name {
  font-size: 16px;
  margin-left: 10px;
}

.shop-middle {
  display: flex;
  /* border-bottom: 2px solid #f2f5f8; */
  margin-bottom: 15px;
}
.shop-middle-left {
  /* background-color: yellow; */
  flex: 1;
  font-size: 12px;
  margin: 10px 0 10px 10px;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  align-items: center;
}

.info-count {
  margin: 3px;
}

.info-goods {
  margin: 2px;
}

.shop-middle-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.table {
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-weight: 600;
}
.table-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 25px;
}
.score {
  color: green;
}

.score-better {
  color: red;
}

.better {
  color: #fff;
  background-color: green;
}

.better-more {
  background-color: red;
}
.shop-bottom {
  display: flex;
  justify-content: center;
  /* background-color: red; */
}
.bottom-btn {
  border: none;
  width: 40%;
  height: 25px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 12px;
  color: #222;
  font-weight: 500;
  background-color: #f2f5f8;
}
</style>