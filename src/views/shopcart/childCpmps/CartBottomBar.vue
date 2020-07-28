<!--  -->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <div class="left">
        <CheckButton class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></CheckButton>
        <span>全选</span>
      </div>
      <div class="center">
        <div class="totalprice">合计: {{ totalprice }}</div>
      </div>
      <div class="right">
        <div class="calculate" @click="calculateClick">去结算{{checkedLength}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.map((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.map((item) => {
          item.checked = true;
        });
      }

      // console.log(this.cartList);
    },
    calculateClick() {
      if (
        this.cartList.filter((item) => {
          return item.checked;
        }).length === 0
      ) {
        this.$toast.show("请选择购买的商品", 1500);
      }
    },
  },
  computed: {
    ...mapGetters({
      length: "getCartLength",
      cartList: "cartList",
    }),
    totalprice() {
      if (this.length !== 0) {
        // console.log(
        //   this.cartList.filter((item) => {
        //     return item.checked;
        //   })
        // );

        return (
          "￥" +
          this.cartList
            .filter((item) => {
              return item.checked;
            })
            .reduce((preValue, item) => {
              return preValue + item.count * item.price;
            }, 0)
        );
      } else {
        // console.log(this.cartList);
        // console.log(this.length);

        return 0;
      }

      //   return this.$store.state.cartList
      //     .fillter(item => {
      //       return item.checked;
      //     })
      //     .reduce((preValue, item) => {
      //       return item.price * item.count;
      //     }, 0);
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // return !this.cartList.filter((item) => !item.checked).length;

      return this.cartList.every((item) => {
        return item.checked;
      });
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 44px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  background-color: #eee;
  position: relative;
}
.check-content {
  width: 100%;
  display: flex;
  align-items: center;
}

.left {
  flex: 1;
  display: flex;
}
.left span {
  width: 40px;
}
.center {
  /* word-wrap: break-word; */
  /* width: 160px; */
  display: flex;
  flex: 1;
}
.right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  float: right;
  background-color: red;
}
.check-button {
  margin: 0 5px;
  width: 20px;
  height: 20px;
}
.totalprice {
  /* right: 0px; */
  width: 100px;
}
.calculate {
  color: white;
}
</style>
