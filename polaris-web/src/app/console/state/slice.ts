import { createSlice } from '@reduxjs/toolkit'

const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    rawQuery: 'page=1&size=512'
  },
  reducers: {
    setQuery: (state, action) => {
      state.rawQuery = action.payload
    }
  }
})

export const {
  setQuery
} = moduleSlice.actions

export const moduleReducer = moduleSlice.reducer

// export type ModuleState = ReturnType<typeof moduleReducer>
