import axios from 'axios'
import store from '@/vuex'



axios.defaults.baseURL = 'http://127.0.0.1:8080'
if (store.getters.getToken) {
  axios.defaults.headers.common['token'] = store.getters.getToken
}


import {
  Loading,
  Message,
  MessageBox
} from 'element-ui'
export default {
  get(url, callback, params = {}) {
    const loading = Loading.service({
      lock: true,
      text: '数据加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    axios.get(url, {
      params: params
    }).then(response => {
      if (response.data.code === 200) {
        callback(response.data)
      }else if(response.code === 401){
        $router.push({
          path: '/login'
        })
      } else {
        Message.error(response.data.message)
      }
    }).catch(err => {
      Message.error(err)
    }).finally(() => {
      loading.close()
    })
  },
  post(url, callback, params = {},msg) {
    const formData = new FormData()
    for (let key in params) {
      formData.append(key, params[key])
    }
    const loading = Loading.service({
      lock: true,
      text: '数据提交中',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    setTimeout(() => {
      loading.close()
    }, 10000)
    axios.post(url, formData)
      .then(response => {
        if (response.data.code === 200) {

          if(msg===undefined  ){
              Message.success(response.data.message)
          }else if(msg != null && msg.length != 0 ){
            Message.success(msg)
          }


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
  /**如果是删除不用传第四个参数 如果是恢复 传back即可*/
  del(url, callback, params = {}, flag = 'del') {
    const text = flag === 'del' ? '确定要删除该数据吗?' : '确定要恢复数据吗'
    const title = flag === 'del' ? '删除操作' : '恢复操作'
    MessageBox.confirm(text, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const formData = new FormData()
      for (let key in params) {
        formData.append(key, params[key])
      }
      const loading = Loading.service({
        lock: true,
        text: '数据提交中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 10000)
      axios.post(url, formData)
        .then(response => {
          if (response.data.code === 200) {
            Message.success(response.data.message)
            callback(response.data)
          } else {
            Message.error(response.data.message)
          }
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
