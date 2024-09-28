import axios from 'axios';

const API_ENDPOINT = 'https://memoize-notes-app.onrender.com/api/users/';
// const API_ENDPOINT = '/api/users/';

const signup = async (data)=>{
    const res = await axios.post(API_ENDPOINT,data);
    if(res.data){
        localStorage.setItem('user',JSON.stringify(res.data));
    }
    return res.data;
}

const login = async (data)=>{
    const res = await axios.post(API_ENDPOINT+"login",data);
    if(res.data){
        localStorage.setItem('user',JSON.stringify(res.data));
    }
    return res.data;
}

const logout = ()=>{
    localStorage.clear();
}

const updateDP = async (data,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(API_ENDPOINT+"uploadDP",data,config);
    return res.data;
}

const userService = {
    signup,
    login,
    logout,
    updateDP,
}

export default userService;
