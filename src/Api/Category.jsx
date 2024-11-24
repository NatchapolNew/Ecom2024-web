import axios from "axios";

export const createCategory = async (token,form)=>{
    //code body
    return  await axios.post('https://ecom2024-api-seven.vercel.app/api/category',form,{headers:{
        Authorization:`Bearer ${token}`
    }})
}

export const listCategory = async ()=>{
    //code body
    return  await axios.get('https://ecom2024-api-seven.vercel.app/api/category')
    }


export const removeCategory = async (token,id)=>{
    //code body
    return  await axios.delete('https://ecom2024-api-seven.vercel.app/api/category/'+id,
        {headers:{
        Authorization:`Bearer ${token}`
    }})
}


