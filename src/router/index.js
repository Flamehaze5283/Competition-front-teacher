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
				},
				{
					path: '/add-competition',
					name: 'AddCompetition',
					component: () => import('@/views/competition/add-competition')
				},
				{
					path: '/edit-competition',
					name: 'EditCompetition',
					component: () => import('@/views/competition/edit-competition')
				},
				{
					path: '/competition',
					name: 'Competition',
					component: () => import('@/views/competition')
				},
				{
					path: '/competition-detail',
					name: 'CompetitionDetail',
					component: () => import('@/views/competition/detail')
				},
				{
					path: '/create-competition',
					name: 'CreateCompetition',
					component: () => import('@/views/competition/create-competition')
				},
				{
					path: '/preview-competition',
					name: 'PreviewCompetition',
					component: () => import('@/views/competition/preview-competition')
				},
				{
					path: '/success-competition',
					name: 'SuccessCompetition',
					component: () => import('@/views/competition/success-competition')
				},
				{
					path: '/teacher',
					name: 'Teacher',
					component: () => import('@/views/teacher')
				},
				{
					path: '/permission',
					name: 'Permission',
					component: () => import('@/views/permission')
				},
				{
					path: '/teacher-role',
					name: 'TeacherRole',
					component: () => import('@/views/teacher/teacher-role')
				},
				{
					path: '/role-permiss',
					name: 'RolePermiss',
					component: () => import('@/views/role/role-permiss')
				}
			]
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/login')
		},
		{
			path: '/passwd',
			name: 'Passwd',
			component: () => import('@/views/login/passwd')
		}
	]
})
