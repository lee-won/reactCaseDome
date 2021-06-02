import axios from 'axios'

const instance = axios.create({
  baseURL:'http://localhost:3456/api',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
})

function http(url:string, method:any, data?:any ) {
  return instance.request({
    method,
    url,
    data
  }).then(res => {
    return new Promise((resolve,rejected) => {
      if(res.status === 200) {
        resolve(res.data)
      } else {
        resolve(new Error('error'))
      }
    })
  })
}
export default http