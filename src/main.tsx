import React from 'react'
import {createRoot} from 'react-dom/client'
import orgApi from './api/org'
import userApi from './api/user'
import './style.css'
import './normal.css'

import OrgTree from './components/orgTree.tsx'
import UserTable from './components/UserTable.tsx'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <h1>Hixtrip FE Online Quiz</h1>
//     <h2>Users:<h2>
//     <p class="read-the-docs" id="user">
//     </p>
//     <h2>Orgs:<h2>
//     <p class="read-the-docs" id="org">
//     </p>
//   </div>
// `

const root = createRoot(document.getElementById('app'))

const treeClickFunc = (node) => {
	console.log(node)
}

root.render(
	<div className="app-inner">
		{/* <h1>Hixtrip FE Online Quiz</h1> */}
		{/* <h2>Users:</h2> */}
		{/* <p className="read-the-docs" id="user"></p> */}
		{/* <h2>Orgs:</h2> */}
		{/* <p className="read-the-docs" id="org"></p> */}
		<OrgTree treeClickFunc={treeClickFunc} />
		<UserTable />
	</div>,
)

orgApi.query('2').then((users) => {
	console.log(users, 'nums---2')

	// document.getElementById('org')!.innerHTML = JSON.stringify(users)
})
