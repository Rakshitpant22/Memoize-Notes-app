import axios from 'axios';

const API_ENDPOINT = 'https://memoize-notes-app.onrender.com/api/notes/';
// const API_ENDPOINT = '/api/notes/';

const getAll = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(API_ENDPOINT,config);
    return res.data;
}

const create = async (data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res =  await axios.post(API_ENDPOINT,data,config);
    return res.data;
}

const update = async (data,token) => {
    const noteID = data.id;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(API_ENDPOINT+noteID,data,config);
    return res.data;
}

const _delete = async (noteID,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(API_ENDPOINT+noteID,config);
    return res.data;
}

const noteService = {
    getAll,
    create,
    update,
    _delete,
}

export default noteService;
