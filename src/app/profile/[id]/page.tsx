import React from 'react'

function UserProfilePage({params}:any) {
  return (
    <div>UserId: {params.id}</div>
  )
}

export default UserProfilePage