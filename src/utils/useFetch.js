import { Store } from '../store/'
import { LOADING } from '../store/ActionTypes'
const SERVER_URI = 'http://slimapp/api';


export const useFetch = async (url, method = 'GET', body = {}) => {
    Store.dispatch({ type: LOADING, payload: true })
    const options = { 
        method ,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }
    if (method !== 'GET') {
        options.body = JSON.stringify(body)
    }
    const req = await fetch(`${SERVER_URI}${url}`, options)
    const fetchResult = await req.json()
    Store.dispatch({ type: LOADING, payload: false })
    return fetchResult
}