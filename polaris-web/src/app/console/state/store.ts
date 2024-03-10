import { configureStore } from '@reduxjs/toolkit'
import { moduleReducer } from './slice'

// export interface StoreReducer {
//   profile: {
//     name: string
//   }
//   module: Reducer<{ name: string }>
// }

const rootStore = configureStore({
  reducer: {
    module: moduleReducer
  }
})

export { rootStore }

export type RootState = ReturnType<typeof rootStore.getState>;
