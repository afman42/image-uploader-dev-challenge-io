<script setup lang="ts">

</script>

<template>
    <div class="w-4/12 bg-[#FFF] rounded-lg drop-shadow-lg p-8 space-y-4 text-center">
        <Icon name="mdi:check-circle" color="green" size="35px" />
        <h1 class="font-poppins font-medium text-2xl">Uploaded Successfully!</h1>
        <!-- <image src="contoh.png" class="rounded-lg w-full h-52" /> -->
        <div class="h-12 w-full bg-blue-50 flex flex-row items-center pl-2 rounded-lg">
            <span class="truncate w-full text-xs">https://images.yourdomain.com/photo-1496950866446-325...</span>
            <button class="text-[#FFF] w-24 bg-[#2F80ED] h-full text-xs rounded-lg">Copy Link</button>
        </div>
    </div>
</template>