<!--  -->
<template>
  <div class="shop-item">
    <div class="item-selector">
      <CheckButton :isChecked="product.checked" @click.native="checkClick"></CheckButton>
    </div>

    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="item-bottom">
        <div class="item-price left">{{ product.price }}</div>
        <div class="item-count right">X{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
  created() {
    // console.log(this.product);
  },
};
</script>
<style scoped>
.shop-item {
  width: 100%;
  display: flex;
  flex-flow: row;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
}
.item-desc {
  font-size: 14px;
  color: #666;
  margin: 15px 0;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom,
.item-price {
  font-size: 18px;
  color: orangered;
}
</style>
