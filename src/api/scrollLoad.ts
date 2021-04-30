import http from  '../utils/http'

export const getScrollLoadList = (params: any) => http('/getList', 'POST', params)

