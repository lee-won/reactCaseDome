import React from 'react'
import NavBar from './NavBar'
import ScrollLoad from '../ScrollLoad'
import FormCase from '../FormCase'
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
        <Route path="/" exact component={ScrollLoad}></Route>
        <Route path="/form" component={FormCase}></Route>
      </div>
      </div>
    </div>
  </BrowserRouter>
  )
}
export default Layout