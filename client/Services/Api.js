import apisauce from 'apisauce'

const API_URL = 'http://localhost:3000'


const createApi  = (baseURL = API_URL ) =>{

    const api = apisauce.create({
        baseURL ,
        headers: { Accept: 'application/vnd.github.v3+json' },
    })

    const addTodo = (email, password) =>api.post('/test',{name : email, price: 419})

    const getTodo = () =>api.get('/test')

    return{
        addTodo,
        getTodo
    }
}

export default {createApi}