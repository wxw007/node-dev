/**
 * axios 接口
 * by-wxw
 */
import axios from 'axios'
import qs from 'qs';
import router from '@/router.js'
import {
    Message,
    MessageBox
} from 'element-ui'

//基本配置常量
let BASE_URL = "//127.0.0.1:3000";
const CONTENT_TYPE = 'application/json'

//自定义请求实例  这里只能赋值静态数据
var instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "content-type": CONTENT_TYPE,
    }
});

var uploadInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "content-type": "multipart/form-data",
    }
});

// ====请求拦截器 （请求的动态数据需要在请求拦截器里赋值 例如token) ==== 
instance.interceptors.request.use(function (config) {
    config.headers['token'] = localStorage.token;
    return config;
}, function (error) {
    //请求错误处理
})

// ====响应拦截器====
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    console.log(error)
    
    return false;
});



/**
 ====== 登陆后的请求接口 带token 用自定义的instance ========
 */

//post
export const getCards = params => {
    return instance.post('/userManager/query/cards', params)
}

//get
export const getCardsDetail = params => {
    return instance.get('/userManager/card/viewCardInfo', {
        params
    })
}

export const users = params => {
    return instance.get('/users', {
        params
    })
}

// 登陆
export const login = params => {
    return instance.post('/login', params)
}

// 验证token
export const checkToken = params => {
    return instance.post('/checkToken', params)
}

// 注册
export const register = params => {
    return instance.post('/register', params)
}

// 获取用户信息
export const getUserInfo = params => {
    return instance.get('/getUserInfo', {params})
}