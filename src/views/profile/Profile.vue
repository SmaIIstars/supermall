<!--  -->
<template>
  <div>
    <NavBar class="profile-nav">
      <div slot="center">我的档案</div>
    </NavBar>

    <div class="profile-title">
      <div class="right">
        <img
          src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3482268351,518808587&fm=26&gp=0.jpg"
          alt
        />
      </div>
      <div class="center">
        <div>登录/注册</div>
        <div>绑定手机号</div>
      </div>
      <div class="left">&gt;</div>
    </div>

    <div class="sort">
      <h2>nums:</h2>
      <h2>{{nums}}</h2>
      <h2>BubbleSort:</h2>
      <h2>{{BubbleSort}}</h2>
      <h2>SelectSort:</h2>
      <h2>{{SelectSort}}</h2>
      <h2>InsertSort:</h2>
      <h2>{{InsertSort}}</h2>
      <h2>ShellSort:</h2>
      <h2>{{ShellSort}}</h2>
      <h2>QuickSort:</h2>
      <h2>{{QuickSort}}</h2>
      <h2>nums:</h2>
      <h2>{{nums}}</h2>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Profile",
  props: {
    message: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  components: {
    NavBar,
  },
  data() {
    return {
      nums: [100, 52, 43, 64, 32, 6, 6, 65, 56, 687, 98, 89, 812],
      nums1: [],
    };
  },
  methods: {
    swap(a, b, num) {
      var temp = num[b];
      num[b] = num[a];
      num[a] = temp;
    },

    // 枢纽选取
    median(left, right, num) {
      let center = Math.floor((left + right) / 2);

      // 3个数排序,先左右
      if (num[left] > num[right]) {
        this.swap(left, right, num);
      }
      if (num[center] > num[right]) {
        this.swap(center, right, num);
      }
      if (num[center] < num[left]) {
        this.swap(center, left, num);
      }

      this.swap(center, right - 1, num);
      return num[right - 1];
    },

    quick(left, right, num) {
      // left找到right结束
      if (left >= right) return;
      let pivot = this.median(left, right, num);
      let i = left;
      let j = right - 1;

      // 准备就绪,left,right开始移动寻找
      while (true) {
        while (num[i] <= pivot && i < j) {
          i++;
        }
        while (num[j] >= pivot && i < j) {
          j--;
        }
        if (i >= j) {
          break;
        } else {
          this.swap(i, j, num);
        }
      }

      this.swap(i, right - 1, num);
      this.quick(left, i - 1, num);
      this.quick(i + 1, right, num);
    },
  },
  computed: {
    BubbleSort() {
      this.nums1 = this.nums.slice();
      for (let i = 0; i < this.nums1.length; i++) {
        for (let j = 0; j < this.nums1.length - i - 1; j++) {
          if (this.nums1[j] > this.nums1[j + 1]) {
            this.swap(j, j + 1, this.nums1);
          }
        }
      }
      return this.nums1;
    },
    SelectSort() {
      this.nums1 = this.nums.slice();
      for (let i = 0; i < this.nums1.length; i++) {
        for (let j = i; j < this.nums1.length; j++) {
          if (this.nums1[i] > this.nums1[j]) {
            this.swap(i, j, this.nums1);
          }
        }
      }
      return this.nums1;
    },
    InsertSort() {
      this.nums1 = this.nums.slice();
      for (let i = 1; i < this.nums1.length; i++) {
        let j = i;
        let temp = this.nums1[j];

        while (j > 0 && this.nums1[j - 1] > temp) {
          this.nums1[j] = this.nums1[j - 1];
          j--;
        }

        this.nums1[j] = temp;
      }
      return this.nums1;
    },
    ShellSort() {
      this.nums1 = this.nums.slice();
      // let gap = Math.floor(this.nums1.length / 2);

      // while (gap >= 1) {
      //   for (let i = gap; i < this.nums1.length; i++) {
      //     let j = i;
      //     let temp = this.nums1[j];

      //     while (this.nums1[j - gap] > temp && j > gap - 1) {
      //       this.nums1[j] = this.nums1[j - gap];
      //       j -= gap;
      //     }
      //     this.nums1[j] = temp;
      //   }
      //   gap = Math.floor(gap / 2);
      // }

      // 1.间距
      let gap = Math.floor(this.nums1.length / 2);

      // 2.间距缩小
      while (gap >= 1) {
        // 选择排序
        for (let i = gap; i < this.nums1.length; i++) {
          let j = i;
          let temp = this.nums1[j];

          while (j > gap - 1 && temp < this.nums1[j - gap]) {
            this.nums1[j] = this.nums1[j - gap];
            j -= gap;
          }
          this.nums1[j] = temp;
        }

        gap = Math.floor(gap / 2);
      }

      return this.nums1;
    },
    QuickSort() {
      this.nums1 = this.nums.slice();
      this.quick(0, this.nums1.length - 1, this.nums1);
      return this.nums1;
    },
  },
};
</script>
<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: white;
}
.profile-title {
  background-color: var(--color-tint);
  padding: 20px;
  display: flex;
  justify-content: space-around;
  color: white;
}
.profile-title .right {
  flex: 1;
}

.profile-title .right img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.profile-title .center {
  flex: 3;
  padding: 3px;
}

.profile-title .left {
  flex: 1;
  top: 0;
  bottom: 0;
  margin: auto 0;
  text-align: center;
}

.sort > h2 {
  font-size: 16px;
}
</style>
