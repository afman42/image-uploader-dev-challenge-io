<script setup lang="ts">
defineProps<{
  numberPercentage?: number
}>()
</script>

<template>
  <div class="w-4/12 bg-[#FFF] rounded-lg drop-shadow-lg p-8 space-y-8">
      <h1 class="font-medium font-poppins text-lg">Uploading...</h1>
      <div class="rounded-full bg-[#F2F2F2] w-full h-2 -z-10">
          <div class="rounded-full bg-[#2F80ED] h-2" :style="{ width: numberPercentage +'%'}"></div>
      </div>
  </div>
</template>