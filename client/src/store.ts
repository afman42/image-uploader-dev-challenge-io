import { reactive, toRefs } from 'vue'

const state = reactive({
    isUpload: false,
    uploadPercentage: 0,
})

export default () => {

  return {
    ...toRefs(state),
  }
}
