/* eslint-disable */
import axios from 'axios';
import router from '@/router/index'

axios.defaults.timeout = 20000;
// axios.defaults.headers.common['Authorization'] = authorToken();
axios.defaults.baseURL = process.env.BASEURL;

let pending = [];
let cancelToken = axios.CancelToken;
let cancelPending = (config) => {
  pending.forEach((item, index) => {
    if (!!config) {
      if (item.u == config.url) {
        item.f(); //取消请求
        pending.splice(index, 1); //移除当前请求记录
      };
    } else {
      item.f(); //取消请求
      pending.splice(index, 1); //移除当前请求记录
    }
  });
};

//验证登录状态
router.beforeEach((to, from, next) => {
  //如果是需要验证登录状态的页面
  if (to.matched.some(record => record.meta.requireAuth)) {
    let token = JSON.parse(authorization()).token;
    //如果已经登录，则正常进入
    if (!!token) {
      cancelPending();
      next();
    } else {
      next({
        'name': 'Login',
        'query': {
          'redirect': to.fullPath
        }
      });
    };
  } else if (to.name == 'login') { //如果是登录页，则验证如果当前是登录状态自动跳转至系统主页，否则正常进入登录页
    let token = JSON.parse(authorization()).token;
    //如果已经登录，则重定向至系统首页
    if (!!token) {
      router.push({
        'name': 'Home'
      });
    } else {
      next();
    };
  } else { //其他页面正常进入
    next();
  };
});


// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    let token = JSON.parse(authorization()).token;
    if (!!token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers = {
        'Content-Type': 'application/json',
        'Authorization': authorization()
      }
    } else {
      config.headers = {
        'Content-Type': 'application/json'
      }
    }
    cancelPending(config);
    config.cancelToken = new cancelToken((c) => {
      pending.push({
        'u': config.url,
        'f': c
      });
    });

    config.data = JSON.stringify(config.data);
    return config;
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 413) { // 业务定制
      console.log('登录过期')
      setTimeout(() => {
        router.push({
          path: '/login',
          querry: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      return false
    } else if (response.data.code >= 500) {
      console.log(`${response.data.msg || '服务器出错，请稍后再试'}`)
      return false
    }
    return response;
  },
  error => {
    console.log(`链接出错，请检查网络状况`)
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        console.log(response)
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
