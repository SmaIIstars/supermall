import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {


  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const toastContrustop = Vue.extend(Toast)

  // 2.new一个组件对象
  const toast = new toastContrustop()

  // 3.将组件进行手动挂载
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应就是div
  document.body.appendChild(toast.$el)


  Vue.prototype.$toast = toast



}

export default obj
