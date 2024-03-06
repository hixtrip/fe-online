import orgApi from './api/org'
import userApi from './api/user'
import ReactDOM from 'react-dom/client'
import React from 'react'
import DemoPage from "./demo";
import "./style.css"

ReactDOM.createRoot(document.getElementById('app')!).render(
  <DemoPage />
)

userApi.query({}).then((users) => {
  document.getElementById('user')!.innerHTML = JSON.stringify(users)
})

orgApi.query('1').then((users) => {
  document.getElementById('org')!.innerHTML = JSON.stringify(users)
})
