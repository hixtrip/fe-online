import userApi from '../../api/user'
import {User} from './interface'
import orgApi from '../../api/org'
import {Org} from './interface'
export const getUser = () =>{
    try {
        return new Promise((resolve)=>{
            userApi.query({}).then((users:User[]) => {
                resolve(users);
            })
        })
    } catch (error) {
        console.log(error);
    }
}
export const getOrg = () =>{
    try {
        return new Promise((resolve)=>{
            orgApi.query('1').then((users:Org[]) => {
                resolve(users);
            })
        })
    } catch (error) {
        console.log(error);
    }
}