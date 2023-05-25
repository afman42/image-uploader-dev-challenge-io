<script setup lang="ts">
import ProgressBar from "../components/ProgressBar.vue";
import { useRouter } from "vue-router";
import { apiPost } from "../api";
import Image from "../assets/image.svg"
import { ref } from "vue"
import { AxiosResponse } from "axios";
let isUpload = ref(false)
let percentageUpload = ref(0)
let router = useRouter()

const filesChange = async (ev: any) => {
    const formData = new FormData();
    const fileList = ev.files
    if (!fileList.length) return;
    formData.append("name", fileList[0],fileList[0].name);
    const axp = await apiPost(formData, isUpload,percentageUpload) as AxiosResponse
    router.push(`/view/${axp.data.id}`)
}
</script>

<template>
    <ProgressBar v-if="isUpload" :number-percentage="percentageUpload" />
    <div v-else class="w-4/12 bg-[#FFF] rounded-lg drop-shadow-lg p-8 text-center">
        <h1 class="font-medium font-poppins text-lg text-[#828282]">Upload your image</h1>
        <h6 class="font-medium font-poppins text-xs text-[#828282] my-4">File should be Jpeg, Png,...</h6>
        <div class="border-2 rounded-lg border-dashed border-blue-100 bg-blue-50 flex justify-center items-center flex-col py-8">
            <img :src="Image" />
            <h1 class="text-[#BDBDBD] font-medium text-lg pt-8">Drag & Drop your image here</h1>
        </div>
        <h1 class="font-poppins font-medium text-[#828282]">Or</h1>
        <div class="my-4" />
        <form novalidate method="POST" enctype="multipart/form-data" class="relative flex justify-center">
            <input accept="image/*" type="file" class="absolute cursor-pointer ml-2 flex h-8 w-36"  @change="e => filesChange(e.target)"  style="opacity: 0;" />
            <span class="h-8 w-36 flex px-2 items-center text-xs font-poppins font-medium bg-blue-500 rounded-lg text-[#FFF] font-medium">Choose Upload File</span>
        </form>
    </div>
</template>