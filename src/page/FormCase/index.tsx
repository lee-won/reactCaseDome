import React, { useState, useRef, useImperativeHandle,forwardRef, useCallback} from 'react'
import { Form, Input, Radio, Select, Button,Divider,message, Col } from 'antd'
import {register} from '../../api/formCase'
import styles from './index.module.scss'
const {Option} = Select
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
}
let FormContent:any = (props:any, ref:any)=> {
  const [flag, setFlag] = useState<boolean>(false)
  const {isForm} = props
  const [form] = Form.useForm()
  const validatePass = (rule:any, value:any, callback:any)=> {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    if (value) {
      if(reg.test(value)) {
        callback()
      } else {
        callback('至少1个大写字母，1个小写字母和1个数字') 
      }
    } else {
      callback('请输入密码') 
    }
  }
  const validatePhone = (rule:any, value:any, callback:any)=> {
    const reg =  /^[1][3,4,5,7,8,9][0-9]{9}$/
    console.log(rule, value)
    if (value) {
      if(reg.test(value)) {
        callback()
      } else {
        callback('手机号格式不正确')
      }
    } else {
      callback('请输入手机号')
    }
  }


  const onFinish = useCallback((values) => {
    if(flag) return
    setFlag(true)
    register(values).then(()=> {
      message.success('注册成功');
    }).finally(() => {
      setFlag(false)
    })
  },[flag])
  const onReset = () => {
    form.resetFields()
  }
  useImperativeHandle(ref, () => ({
    submitForm: () => {
       form.submit()
    },
    resetForm: () => {
      form.resetFields()
    }
  }));
   return (
    <Form {...formItemLayout} onFinish={onFinish} initialValues={{sex: 1}} form={form}>
      <Form.Item name="name" label="用户名：" rules={[{required:true, message:'请输入用户名'}]}>
        <Input maxLength={10} />
      </Form.Item>
      <Form.Item name="password" label="密码："rules={[{required:true, validator:validatePass}]}>
        <Input minLength={8} maxLength={20} />
      </Form.Item>
      <Form.Item name="phone" label="手机号：" rules={[{required: true, validator: validatePhone}]}>
        <Input />
      </Form.Item>
      <Form.Item name="sex" label="性别：">
      <Radio.Group>
          <Radio value={1}>男</Radio>
          <Radio value={0}>女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="country" label="性别：">
      <Select placeholder="请选择国家">
          <Option value="china">中国</Option>
          <Option value="usa">美国</Option>
        </Select>
      </Form.Item>
      {
        isForm && <Form.Item wrapperCol={{ span: 10, offset: 6 }}>
        <div className={styles.btn_wrap}>
          <Button className={styles.btn} type="primary" htmlType="submit">
            form内提交表单
          </Button>
          <Button className={styles.btn} onClick={onReset}>
            重置
          </Button>
        </div>
        </Form.Item>
      }
      
    </Form>
  )
}

FormContent = forwardRef(FormContent)

function FormCase() {
  const [isForm, setIsForm] = useState<boolean>(true)
  const formRef:any = useRef()
  const optionsWithDisabled = [
    { label: '表单内提交', value: true },
    { label: '表单外提交', value: false },
  ]
  const formSubmit = () => {
    formRef.current.submitForm()
  }
  const formReset = () => {
    formRef.current.resetForm()
  }
  
  return(
    <div>
      <Radio.Group
          options={optionsWithDisabled}
          onChange={(e) => {
            setIsForm(e.target.value)
          }}
          value={isForm}
          optionType="button"
          buttonStyle="solid"
        />
      <Divider />
      <FormContent isForm={isForm} ref={formRef} />
      <Divider />
      {
        !isForm && <Col span={24} offset={6}>
        <div className={styles.btn_wrap}>
          <Button className={styles.btn} type="primary" onClick={formSubmit}>form外提交表单</Button>
          <Button className={styles.btn} onClick={formReset}>重置</Button>
        </div>
        </Col>
      }
    </div>
  )
}

export default FormCase