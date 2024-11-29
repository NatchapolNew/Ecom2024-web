import axios from "axios";

export const createCategory = async (token,form)=>{
    //code body
    return  await axios.post('http://localhost:5001/api/category',form,{headers:{
        Authorization:`Bearer ${token}`
    }})
}

export const listCategory = async ()=>{
    //code body
    return  await axios.get('http://localhost:5001/api/category')
    }


export const removeCategory = async (token,id)=>{
    //code body
    return  await axios.delete('http://localhost:5001/api/category/'+id,
        {headers:{
        Authorization:`Bearer ${token}`
    }})
}


