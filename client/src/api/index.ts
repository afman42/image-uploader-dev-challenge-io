import axios, { AxiosProgressEvent } from "axios"
import { Ref } from "vue"

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export const apiPost = async (data: any | DragEvent, isUpload: Ref<Boolean>, uploadPercentage: Ref<Number>, errResponse: Ref<{ code: number, message: string }>) => {
    isUpload.value = true
    const formData = new FormData();
    const fileList = data
    if (!fileList.length) return;
    formData.append("name", fileList[0],fileList[0].name);
    return await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function(progressEvent: AxiosProgressEvent){
            // @ts-ignore
            uploadPercentage.value = Math.round((progressEvent.loaded / progressEvent?.total ) * 100 );
        },
    }).then((res) => {
        return res
    }).catch((er: any) => { 
        isUpload.value = false
        console.log(er)
        if (er.response) {
            errResponse.value.code = er.response.status
            errResponse.value.message = er.response.data
        }
    })
}

export const apiGetID = async (id: string) => {
    return await api.get(`/view/${id}`).then((res) => res).catch((er) => console.log(er))
}