import React, { useEffect, useMemo, useState } from 'react'
import { Row, Col, Select, Checkbox, Button,  Table } from 'antd'
import styles from './index.module.scss'
import {getMetadataOption, IOption} from '../../api/factorialTable'
const { Option } = Select
const CheckboxGroup = Checkbox.Group

interface IMetadata {
  id: number,
  metadata?: IOption
}

function RenderMetadata(props:any) {
  const { limit, selectOptions, metadata, setMainMetadata, formatDataSource, formatColumns } = props
  // 已选择了的metadata
  const selecteds:string[] = useMemo(() => {
    const fiterData:IMetadata[] =  metadata.filter((item:any) => item.metadata)
    return fiterData.map((item:any) => item.metadata.id)
  },[metadata])
  // 修改metadata项
  const updateMetadata = (value:any, index:number) => {
    const metadataItem = selectOptions.find((item:IOption) => item.id === value)
    setMainMetadata((prev:IMetadata[]) => {
      const temp:IMetadata[] = prev.map((item:IMetadata, i:number) => {
        return i === index ? { ...item, metadata: {...metadataItem} } : item
      })
      return temp
    })
  }
  // 修改metadata项选择的labels
  const updateMetadataCheckedLabels = (value:string[], index:number) => {
    const temp = metadata
    temp[index].metadata.checkedLabels = value
    formatColumns(temp)
    formatDataSource(temp)
  }
  return (
    <div className={styles.row_wrap}>
      {metadata.map((item:any, index:number) => {
        return (
          <Row className={styles.row_wrap} key={item.id}>
            <Col span={6}>
              <Select
                placeholder="请选择metadata"
                style={{ width: '100%' }}
                onChange={(value) => {
                  updateMetadata(value, index)
                }}
              >
                {selectOptions.length &&
                  selectOptions.map((item:any) => (
                    <Option key={Math.random()} value={item.id} disabled={selecteds.includes(item.id)}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Col>
            <Col span={8} offset={1}>
              <CheckboxGroup
              value={item?.metadata?.checkedLabels}
                options={item?.metadata?.labels}
                onChange={(value) => {
                  updateMetadataCheckedLabels(value as string[], index)
                }}
              />
            </Col>
            <Col span={1} >
              <Button
                type="link"
                danger
                onClick={() => {
                  setMainMetadata((prev:IMetadata[]) => {
                    return prev.filter((i:IMetadata) => item.id !== i.id)
                  })
                }}
              >
                删除
              </Button>
            </Col>
          </Row>
        )
      })}
      {metadata && metadata.length < limit ? (
        <Row>
          <Col span={6}>
            <Button
              type="primary"
              onClick={() => {
                setMainMetadata((prev:IMetadata[]) => {
                  return [...prev, { id: Math.random() }]
                })
              }}
            >
              还可添加{limit - metadata.length}个主Metadata
            </Button>
          </Col>
        </Row>
      ) : null}
    </div>
  )
}

function FactorialTable() {
  const [selectOptions, setSelectOptions] = useState<IOption[]>([])
  const [mainMetadata, setMainMetadata] = useState<IMetadata[]>([])
  const [columns, setColumns] = useState<any>([])
  const [tableData, setTableData] = useState([])

  useEffect( () => {
    fetchMetadataOption()
  },[])

  const fetchMetadataOption = async () => {
    const  res:any = await getMetadataOption()
    setSelectOptions(res.result || [])
  }

  // 计算rowSpan
  const calculateRowSpan = (colIndex:number, rowIndex:number, list:IMetadata[], row:any) => {
    let rowSpan = 1
    list.forEach((item:any, index:number) => {
      if (index > colIndex) {
        rowSpan = rowSpan * item?.metadata.checkedLabels.length
      }
    })
    return colIndex < list.length - 1 ? (rowIndex % rowSpan === 0 ? rowSpan : 0) : 1
  }

  // 格式化表头
  const formatColumns = (data:IMetadata[]) => {
    const fiterData:IMetadata[] =  data.filter((item:any) => item.metadata && item?.metadata?.checkedLabels.length)
    const tempColumns = fiterData.map((item:any, colIndex:number) => {
      return {
        title: item?.metadata.name,
        dataIndex: item?.metadata.type,
        key: item?.metadata.type,
        render: (value:any, row:any, rowIndex:any) => ({
          children: value,
          props: {
            rowSpan: calculateRowSpan(colIndex, rowIndex, fiterData, row),
          },
        }),
      }
    })
    setColumns(tempColumns)
  }

  // 通过label值找名称
  const findNameByValue = (value:string, list:any) => {
    return list.find((item:any) => item.value === value).label
  }

  // 格式化表格字段
  const formatDataSource = (data:IMetadata[]) => {
    const fiterData:IMetadata[] = data.filter((item:any) => item.metadata && item.metadata.checkedLabels.length)
    let tempData:any = [] 
    fiterData.forEach((item:any) => {
      let arr = tempData
      tempData = []
      if (item.metadata && item.metadata.checkedLabels) {
        if (arr.length) {
          arr.forEach((temp:any) => {
            item.metadata.checkedLabels.forEach((label:string)=> {
              tempData.push({
                ...temp,
                [item.metadata.type]: findNameByValue(label, item.metadata.labels),
              })
            })
          })
        } else {
          item.metadata.checkedLabels.forEach((label:any) => {
            tempData.push({ [item.metadata.type]: findNameByValue(label, item.metadata.labels) })
          })
        }
      }
    })
    setTableData(tempData)
  }

  useEffect(() => {
    formatColumns(mainMetadata)
    formatDataSource(mainMetadata)
  }, [mainMetadata]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Row className={styles.row_wrap}>
        <Col span={4}>主Metadata*</Col>
        <Col span={20}>
          <RenderMetadata
            selectOptions={selectOptions}
            limit={4}
            setMainMetadata={setMainMetadata}
            formatDataSource={formatDataSource}
            formatColumns={formatColumns}
            metadata={mainMetadata}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>主Metadata生成标准SKU</Col>
        <Col span={24}>
          <Table size="small" dataSource={tableData} columns={columns} pagination={false} bordered />
        </Col>
      </Row>
    </div>
  )
}

export default FactorialTable
