import Button from './components/button'
// import Icon from './components/icon'
// import ButtonGroups from './components/button-groups'

// import { ButtonGroups } from '@/BaseUI/src'  // 局部导入组件
export {
  // Icon,
  Button
  // ButtonGroups
}

// import BaseUI from 'BaseUI';
// BaseUI.ButtonGroups 1.局部导入组件
// const { ButtonGroups } = BaseUI  // 2.局部导入组件（解构也可以获取）
const BaseUI = {
  // Icon,
  Button
  // ButtonGroups
}

// 需要被全局注册的组件
export const components = [
  // Icon,
  Button
  // ButtonGroups
]

BaseUI.install = function(Vue, options = {}) {
  // install all the comps
  components.forEach(component => {
    // BButton
    if (component.name) {
      // 1.注册全局组件
      Vue.component(component.name, component)
    }
  })
  // 2.
  // Vue.prototype.$alert = MessageBox.alert
}
export default BaseUI
