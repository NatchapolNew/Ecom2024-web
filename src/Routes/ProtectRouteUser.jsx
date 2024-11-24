import React from 'react'
import { useState,useEffect } from 'react'
import useEcomStore from '../Store/ecom-store'
import { currentUser } from '../Api/auth'
import LoadingtoRedirect from './LoadingtoRedirect'

const ProtectRouteUser = ({element}) => {

    const [ok,setOk] = useState(false)
    const user = useEcomStore((state)=>state.user)
    const token = useEcomStore((state)=>state.token)

    useEffect(()=>{
        if(user && token){
            //send to back
            currentUser(token)
            .then((res)=> setOk(true))
            .catch((err)=> setOk(false))
        }
    },[])


  return ok ? element:<LoadingtoRedirect/>
}

export default ProtectRouteUser