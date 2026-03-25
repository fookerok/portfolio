import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import components from './components/UI'
import 'virtual:svg-icons-register'
import router from './router/router.js'
const app = createApp(App)
components.forEach(component =>{
	app.component(component.name, component)
})

app.use(router).mount('#app')

