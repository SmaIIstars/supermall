<!--  -->
<template>
  <div>
    <GoodsList :goods="categoriesDetail"></GoodsList>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "TabContentDetail",
  props: {
    categoriesDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsList,
  },
};
</script>
<style scoped>
</style>