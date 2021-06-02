import http from  '../utils/http'

export const register = (params: any) => http('/register', 'POST', params)