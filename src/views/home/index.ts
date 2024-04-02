import userApi from '../../api/user'
import {User} from './interface'
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