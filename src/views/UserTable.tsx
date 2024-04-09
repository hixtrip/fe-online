
import userApi from '../api/user'
import React, { useEffect } from 'react';



function UserTable() {

  useEffect(() => {
    userApi.query({}).then((users) => {
      console.log(users)
    })
  }, [])

  return (
    <div>
      123
    </div>
  );
}

export default UserTable;