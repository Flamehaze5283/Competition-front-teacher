import axios from 'axios'
import store from '@/vuex'
axios.defaults.baseURL = 'http://127.0.0.1:8081'
if(store.getters.getToken) {
  axios.defaults.headers.common['token'] = store.getters.getToken
}
import { Loading,Message,MessageBox } from 'element-ui'
export default {
  get(url,callback,params = {}) {
    const loading = Loading.service({
      lock: true,
      text: '数据加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    axios.get(url,{
      params: params
    }).then(response => {
      if(response.data.code === 200) {
        callback(response.data)
      } else {
        Message.error(response.data.message)
      }
    }).catch(err => {
        Message.error(err)
    }).finally(() => {
      loading.close()
    })
  },
  post(url,callback,params = {}) {
    const formData = new FormData()
    for(let key in params) {
      formData.append(key,params[key])
    }
    const loading = Loading.service({
      lock: true,
      text: '数据提交中',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    setTimeout(() => {
      loading.close()
    },10000)
    axios.post(url,formData)
     .then(response => {
        if(response.data.code === 200) {
          // Message.success(response.data.message)
        } else {
          Message.error(response.data.message)
        }
        callback(response.data)
     }).catch(err => {
        Message.error(err)
    }).finally(() => {
        loading.close()
    })
  },
  del(url,callback,params = {}) {
    MessageBox.confirm('确定要删除该数据吗?','删除操作', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      const formData = new FormData()
      for(let key in params) {
        formData.append(key,params[key])
      }
      const loading = Loading.service({
        lock: true,
        text: '数据提交中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      },5000)
      axios.post(url,formData)
       .then(response => {
          if(response.data.code === 200) {
            Message.success(response.data.message)
          } else {
            Message.error(response.data.message)
          }
          callback(response.data)
       }).catch(err => {
          Message.error(err)
      }).finally(() => {
          loading.close()
      })
    })
  },
  setToken(token) {
    axios.defaults.headers.common['token'] = token
  }
}
