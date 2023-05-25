import axios, { AxiosProgressEvent } from "axios"
import { Ref } from "vue"

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export const apiPost = async (data: FormData, isUpload: Ref<Boolean>, uploadPercentage: Ref<Number>) => {
    isUpload.value = true
    return await api.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function(progressEvent: AxiosProgressEvent){
            uploadPercentage.value = Math.round((progressEvent.loaded / progressEvent?.total ) * 100 );
        },
    }).then((res) => { 
        isUpload.value = false
        return res
    }).catch((er) => { 
        isUpload.value = true
        console.log(er)
    }).finally(() => isUpload.value = false)
}