import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "noty/lib/noty.css"
import "noty/lib/themes/mint.css"

createApp(App).use(router).mount('#app')
