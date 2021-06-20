import http from  '../utils/http'

export const getMetadataOption = () => http('/getMetadataOption', 'get')
export interface ILabel {
  label:string
  value:string
}
export interface IOption {
  id: number
  name: string
  type: string
  labels: ILabel[]
  checkedLabels?: string[]
}
