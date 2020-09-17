import router from '@/router'
import store from '@/vuex'
const whitelist = [
  '/login'
]
router.beforeEach((to,from,next) => {
  if(whitelist.indexOf(to.path) !== -1) {
    next()
  } else {
    /**
     * 不在白名单 验证是否存在token 如果不存在 重定向会登录页
     *
     * */
      if(store.getters.getToken) {
        next()
      } else {
        // next('/login')
		next()
      }
  }
})
export default router
