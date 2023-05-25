<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { apiGetID } from '../api';
const route = useRoute();
const getImg = reactive<{ name: string, id: number, copyClipboard: () => void }>({
    id: 0,
    name: "",
    copyClipboard: function(): void{
        navigator.clipboard.writeText(`http://localhost:5173/view/${this.id}`)
        alert("Copying text successfully")
    },
})
onMounted(async () => {
    const avid = await apiGetID(route.params.id as string)
    getImg.name = (avid as any).data.name
    getImg.id = (avid as any).data.id
})
</script>

<template>
    <div v-if="getImg.name != ''" class="w-4/12 bg-[#FFF] rounded-lg drop-shadow-lg p-8 space-y-4 text-center">
        <!-- <Icon name="mdi:check-circle" color="green" size="35px" /> -->
        <h1 class="text-xl font-poppins font-medium">Checklist</h1>
        <h1 class="font-poppins font-medium text-2xl">Uploaded Successfully!</h1>
        <img :src="`http://localhost:3000${getImg.name}`" class="rounded-lg w-full h-52" />
        <div class="h-12 w-full bg-blue-50 flex flex-row items-center pl-2 rounded-lg">
            <span class="truncate w-full text-xs">http://localhost:5173/view/{{ getImg.id }}</span>
            <button class="text-[#FFF] w-24 bg-[#2F80ED] h-full text-xs rounded-lg" @click="getImg.copyClipboard">Copy Link</button>
        </div>
    </div>
</template>