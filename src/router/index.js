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
				path: '/constant-item-teacher',
				name: 'ConstantItemTeacher',
				component: () => import('@/views/basic-constant/constant-item-teacher')
			},
			{
				path: '/constant-item-student',
				name: 'ConstantItemStudent',
				component: () => import('@/views/basic-constant/constant-item-student')
			},
			{
				path: '/constant-type-teacher',
				name: 'ConstantTypeTeacher',
				component: () => import('@/views/basic-constant/constant-type-teacher')
			},
			{
				path: '/constant-type-student',
				name: 'ConstantTypeStudent',
				component: () => import('@/views/basic-constant/constant-type-student')
			}]
		}
		// {
		// 	path: '/login',
		// 	name: 'Login',
		// 	component: () => import('@/views/login/')
		// }
	]
})
