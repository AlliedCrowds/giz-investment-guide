/**
 * Front-end entrypoint
 */

// Import static CSS assets
import '@assets/css/style.css'
import '@assets/css/responsive.css'

// Import package dependencies
import Vue from 'vue'
Vue.config.productionTip = false
import { sync } from 'vuex-router-sync'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

VTooltip.options.defaultTemplate =
  '<div class="tooltip-diff" role="tooltip"><div class="tooltip-diff-arrow"></div><div class="tooltip-diff-inner"></div></div>'
;(VTooltip.options.defaultInnerSelector =
  '.tooltip-diff-inner, .tooltip__inner'),
  (VTooltip.options.defaultArrowSelector =
    '.tooltip-diff-arrow, .tooltip__arrow')
VTooltip.options.popover = {
  defaultPlacement: 'bottom',
  // Use the `popoverClass` prop for theming
  defaultClass: 'vue-popover-theme',
  // Base class (change if conflicts with other libraries)
  defaultBaseClass: 'tooltip-diff popover-diff',
  // Wrapper class (contains arrow and inner)
  defaultWrapperClass: 'wrapper',
  // Inner content class
  defaultInnerClass: 'tooltip-diff-inner popover-diff-inner',
  // Arrow class
  defaultArrowClass: 'tooltip-diff-arrow popover-diff-arrow',
  defaultDelay: 0,
  defaultTrigger: 'click',
  defaultOffset: 0,
  defaultContainer: 'body',
  defaultBoundariesElement: undefined,
  defaultPopperOptions: {},
  // Hides if clicked outside of popover
  defaultAutoHide: true,
  // Update popper on content resize
  defaultHandleResize: true,
}

// Import local dependencies
import App from './App.vue'
import router from './router'
import store from './stores'

// Synchronize the router and store
sync(store, router)

// Start Vue
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
