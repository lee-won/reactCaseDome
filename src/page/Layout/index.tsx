import React from 'react'
import NavBar from './NavBar'
import ScrollLoad from '../ScrollLoad'
import styles from './app.module.scss'
import { BrowserRouter, Route } from 'react-router-dom'
function Layout() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
      <div className={styles.left}>
        <NavBar />
      </div>
      <div className={styles.right}>
        <div className={styles.content}>
        <Route path="/" component={ScrollLoad}></Route>
      </div>
      </div>
    </div>
  </BrowserRouter>
  )
}
export default Layout