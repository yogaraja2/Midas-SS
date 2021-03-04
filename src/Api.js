import axios from 'axios'
import { baseURL } from './BaseUrl'

export default axios.create({
    baseURL: `${baseURL}${'/api/'}`,
})

export const METHOD = {
    GET: 'GET',
    POST: 'POST'
}

export const URL = {
    signup: 'signup',
    userprofile: 'userprofile',
    login: 'login',
    forgotPassword: 'forgotPassword',
    gameDetails: 'createGame-details',
    dreamSelection: 'dreamSelection',
    leaderBoard: 'leaderboard',
}