import { createSlice } from '@reduxjs/toolkit'

const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    rawQuery: 'page=1&size=512'
  },
  reducers: {
    setQuery: (state, action) => {
      state.rawQuery = action.payload
    },
    reloadData: (state) => {
      state.rawQuery = state.rawQuery + (state.rawQuery ? '&' : '?') + 'reload=' + new Date().getTime()
    }
  }
})

export const {
  setQuery,
  reloadData
} = moduleSlice.actions
export const moduleReducer = moduleSlice.reducer

export type ModuleState = ReturnType<typeof moduleReducer>
