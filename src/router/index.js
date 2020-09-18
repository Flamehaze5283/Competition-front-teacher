import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'Index',
			component: () => import('@/views'),
			children: [{
				path: '/role',
				name: 'Role',
				component: () => import('@/views/role')
			},
			{
				path: '/constant-item',
				name: 'ConstantItem',
				component: () => import('@/views/basic-constant/constant-item')
			},
			{
				path: '/constant-type',
				name: 'ConstantType',
				component: () => import('@/views/basic-constant/constant-type')
			}]
		}
		// {
		// 	path: '/login',
		// 	name: 'Login',
		// 	component: () => import('@/views/login/')
		// }
	]
})
