import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations.-type"


export default {
  // 唯一目的就是修改state
  // 每个方法功能单一
  // 作为方法名的时候需要加[]
  [ADD_COUNTER](staet, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
