import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { LoadingOutlined } from '@ant-design/icons'; 
import {getScrollLoadList} from '../../api/scrollLoad'
// let loadingRef = false
function ScrollLoad() {
  const [list, setList] = useState<number[]>([])
  const [pageNum, setPageNum]=useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const wrapRef = useRef<any>(null)
  
  const loadingRef = useRef<boolean>()
  loadingRef.current = loading
  // loadingRef = loading
  useEffect(() => {
    const Dom = wrapRef.current
      Dom.addEventListener('scroll',loadMore)
      console.log(Dom,loading)
    return () => {
      console.log('清空监听事件')
      Dom.removeEventListener('scroll',loadMore)
    }
    // eslint-disable-next-line
  },[])
  useEffect(() => {
    getList()
    // eslint-disable-next-line
  },[pageNum])
  const getList = () => {
    setLoading(true)
    getScrollLoadList({pageNum}).then((res:any) => {
      const temp = res.result
      const nowList = pageNum === 1 ? temp : [...list,...temp]
      setList(nowList)
    }).finally(() => {
      setLoading(false)
    })
  }
  const loadMore = (e:any) => {
    const {offsetHeight, scrollTop, scrollHeight} = e.target
    if(offsetHeight + scrollTop === scrollHeight) {
      console.log(loadingRef, '下拉加载之前')
      // if(loadingRef) return
      if(loadingRef.current) return
      setPageNum((pageNum)=> pageNum + 1)
    }
  }
  return (
    <div ref={wrapRef} className={styles.scroll_wrap}>
      {
        list && list.length > 0 && list.map(item => (
          <div key={item} className={styles.wrap_item}>{item}</div>
        ))
      }
      {loading && <div className={styles.loading}><LoadingOutlined /></div> }
    </div>
  )
}

export default ScrollLoad