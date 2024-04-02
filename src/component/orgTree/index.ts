import orgApi from '../../api/org'
import {Org} from './interface'
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