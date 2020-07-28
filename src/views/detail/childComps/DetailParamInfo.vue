<!--  -->
<template>
  <div class="param-info">
    <div class="size-info">
      <div class="size-items" v-for="(items,index) in paramInfo.sizes[0]" :key="index">
        <div class="size-item" v-for="(item, index) in items" :key="index">{{item}}</div>
      </div>
    </div>
    <div class="other-info" v-for="(item, index) in paramInfo.infos" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-value">{{item.value}}</div>
    </div>
    <div class="img-info" v-if="paramInfo.image.length !==0">
      <div v-for="(item, index) in paramInfo.image" :key="index">
        <img :src="item" alt class="img-info-item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default: null,
    },
  },
};
</script>
<style scoped>
.param-info {
  border-bottom: 4px solid #f2f5f8;
}
.size-info {
  border-top: 4px solid #f2f5f8;
}
.size-items {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
  width: 90%;
  border-bottom: 2px solid #f2f5f8;
  padding-bottom: 15px;
}
.size-item {
  width: 100%;
  text-align: center;
  font-size: 14px;
}

.other-info {
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90%;
  /* background-color: red; */
  margin: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.info-key {
  padding-left: 4%;
  flex: 1;
}
.info-value {
  padding-left: 10px;
  flex: 4;
  color: var(--color-high-text);
  font-size: 14px;
}
.img-info-item {
  width: 100%;
}
</style>