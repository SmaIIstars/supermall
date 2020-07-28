<!--  -->
<template>
  <div class="cart">
    <NavBar class="cart-nav">
      <div slot="center">购物车 ({{ length }})</div>
    </NavBar>
    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childCpmps/CartList";
import CartBottomBar from "./childCpmps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 1
    // ...mapGetters(["getCartLength", "cartList"])
    // 2
    ...mapGetters({
      length: "getCartLength",
      list: "cartList",
    }),
  },
};
</script>
<style scoped>
.cart {
  height: 100vh;
  width: 100%;
}
.cart-nav {
  background-color: var(--color-tint);
  width: 100%;
  color: white;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
}
</style>
