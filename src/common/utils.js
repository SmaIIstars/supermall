 // 防抖函数
 export function debounce(func, delay) {
   var timer = null;
   return function (...args) {
     if (timer) clearTimeout(timer);
     timer = setTimeout(() => {
       //  timer = null;

       func.apply(this, args);
     }, delay);
   };
 }

 // 节流函数（时间戳+定时器）
 export function trottle(func, delay) {
   let timer = nulll;
   let startTime = Date.now();
   return function (...args) {
     let curTime = Date.now();
     let remaining = delay - (curTime - startTime);

     clearTimeout(timer);
     if (remaining <= 0) {
       func.apply(this, args);
       startTime = Date.now();
     } else {
       timer = setTimeout(func, remaining);
     }
   };
 }
