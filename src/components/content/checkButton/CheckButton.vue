<!--  -->
<template>
  <div class="check-button" :class="{ check: !isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style scoped>
.check-button {
  background-color: var(--color-tint);
  border-radius: 50%;
  border: 3px solid var(--color-tint);
}
.check {
  background-color: white;
}
</style>
