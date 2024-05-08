import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

fetch('http://localhost:5000/loginGetInfo', {
  method: 'post',
  headers: {
    'Accept': 'application/json,text/plain,*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'username=test&password=12345'
})
  .then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    localStorage.setItem('info', JSON.stringify(data))
  }).catch((error) => {
    console.log(error)
  })

export default App
