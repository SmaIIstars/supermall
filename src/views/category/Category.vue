<!--  -->
<template>
  <div class="category">
    <NavBar class="category-nav">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="content">
      <TabMenu :categories="categories" v-if="categories" class="tab-menu" @itemClick="itemClick"></TabMenu>

      <Scorll class="categories-info">
        <div>
          <TabContentCategory :subCategories="subCategories" class="info-one"></TabContentCategory>
          <TabControl :titles="['综合', '新品', '销量']"></TabControl>
          <TabContentDetail :categoriesDetail="categoriesDetail"></TabContentDetail>
        </div>
      </Scorll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scorll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";

import TabMenu from "./childCategory/TabMenu";
import TabContentCategory from "./childCategory/TabContentCategory";
import TabContentDetail from "./childCategory/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
  CategoryDetailGoods,
} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    Scorll,
    TabMenu,
    TabContentCategory,
    TabControl,
    TabContentDetail,
  },
  data() {
    return {
      categories: [],
      currentIndex: 0,
      categoriesDetail: [],
      subCategories: [],
    };
  },
  methods: {
    // 数据请求
    _getCategory() {
      // 请求列表信息
      getCategory().then((res) => {
        const data = res.data.data;
        this.categories = data.category.list;
        this._getSubcategory(0);
      });
    },

    _getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then((res) => {
        // console.log(res.data[0]);
        // let CategoryDetailGoods = new CategoryDetailGoods(res.data[0]);
        this.categoriesDetail = res.data;
        // console.log(CategoryDetailGoods);
      });
    },

    // 请求内容信息
    _getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.subCategories = res.data.data.list;
        // console.log(this.subCategories);
      });

      const miniWallkey = this.categories[index].miniWallkey;
      this._getCategoryDetail(miniWallkey, "pop");
    },

    // 监听事件
    itemClick(index) {
      this._getSubcategory(index);
    },
  },

  created() {
    this._getCategory();
  },
  mounted() {},
};
</script>
<style scoped>
.category {
  position: relative;
  height: 100vh;
}

.category-nav {
  background-color: var(--color-tint);
  color: white;
  width: 100%;
  z-index: 10;
}

.content {
  display: flex;
}

.tab-menu {
  flex: 1;
  overflow: hidden;
}

.categories-info {
  flex: 3;
  height: calc(100vh - 49px - 43px);
  overflow: hidden;
  /* background-color: red; */
}

.info-one {
  word-break: break-all;
  /* width: 100%; */
}
</style>
