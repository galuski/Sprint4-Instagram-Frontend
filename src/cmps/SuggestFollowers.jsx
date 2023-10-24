import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export  function SuggestFollowers({users}) {

    return (
        <>
<h4 style={{padding:'10px',margin:'0'}}>Suggested to you</h4>
             {users.map(user=><UserPreview user={user}/>)}

        </>
    )
}

function UserPreview({ user }) {
    return (
        <>
        <section style={{margin:'5px',display:'flex',textAlign:'center',justifyContent:'space-between'
    ,padding:'10px'}}>
            <div style={{display:'flex',alignItems:'center'}}>
                <img style={{marginInlineEnd:'5px',width:'40px',height:'40px',borderRadius:'50%'}} src={user.imgUrl} alt="" />
                <strong>{user.username}</strong>
            </div>
            <div>
                <span>Follow</span>
            </div>
        </section>
        </>
    )
}