import { useUserStore } from '../store/user'
import { storeToRefs } from "pinia";
import { computed, ref,Ref } from 'vue'
export default function () {
    const userStore = useUserStore()
    const { userList } = storeToRefs(userStore)
    console.log(userList, 'userList')
    const search = ref('')
    const filterTableData = computed(() =>
        userList.value.filter(
            (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
        )
    )
    
const timer: Ref<null | number> = ref(null)
    function handleUser() {
        // 节流
        if(timer.value !== null){
            return
        }
        timer.value = setTimeout(()=>{
            userStore.getUser()
            timer.value = null
        },1000)
    }
    return { handleUser, userList, filterTableData, search }
}