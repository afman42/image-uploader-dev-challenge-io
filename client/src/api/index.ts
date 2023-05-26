import axios, { AxiosProgressEvent } from "axios"
import { Ref } from "vue"
import Noty from 'noty';

const api = axios.create({
    baseURL: "http://localhost:3000"
})

function notification(text: string, type: Noty.Type){
    new Noty({
        text: text,
        type: type,
        layout: "topRight",
        timeout: 1000
    }).show()
}

export const apiPost = async (data: any | DragEvent, isUpload: Ref<Boolean>, uploadPercentage: Ref<Number>) => {
    notification("Uploading....","info")
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
        notification("Succesfully....","success")
        return res
    }).catch((er: any) => { 
        isUpload.value = false
        console.log(er)
        if (er.response?.status == 422) {
            const errorLoop = er.response?.data.name._errors
            for (let index = 0; index < errorLoop.length; index++) {
                const msg = errorLoop[index];
                notification(msg,"error") 
            }
        }
        if (er.response?.status == 500) {
            const errorMsg = er.response?.data.data
            notification(errorMsg,"error");
        }
    })
}

export const apiGetID = async (id: string) => {
    return await api.get(`/view/${id}`).then((res) => res).catch((er) => {
        if (er.response?.status == 404) {
            const errorMsg = er.response?.data.data
            notification(errorMsg,"error");
        }
    })
}