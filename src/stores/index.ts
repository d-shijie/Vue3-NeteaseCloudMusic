import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
const store = createPinia()
store.use(createPersistedState())
export default store