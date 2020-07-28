<!--  -->
<template>
  <div class="comment-info">
    <div class="info-hearder">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | getDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div v-if="commentInfo.images">
        <div class="info-images" v-for="(item, index) in commentInfo.images" :key="index" if>
          <img :src="item" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default: {},
    },
  },
  filters: {
    getDate(value) {
      return moment(value * 1000).format("YYYY-MM-DD");
    },
  },
};
</script>
<style scoped>
.comment-info {
  display: flex;
  flex-flow: column;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90%;
  padding: 10px 0;
  margin-bottom: 20px;
}
.info-hearder {
  padding: 10px 5px;
  border-bottom: 2px solid #f2f5f8;
}
.header-title {
  float: left;
  font-size: 16px;
}
.header-more {
  float: right;
  font-size: 14px;
}
.info-user {
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.info-user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.info-user span {
  font-weight: 600;

  padding-left: 10px;
  text-align: center;
}
.info-detail {
  margin: 5px 0;
  font-weight: 500;
  color: #222;
}
.info-other {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.date {
  padding-right: 5px;
}
.info-images img {
  float: left;
  margin-right: 10px;
  width: 60px;
  height: 60px;
}
</style>
