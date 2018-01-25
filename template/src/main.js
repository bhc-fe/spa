import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
	preLoad: 1.1, //预加载高度比例
})


Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})