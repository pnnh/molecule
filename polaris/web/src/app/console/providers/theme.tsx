// import { createContext, useContext, useState } from 'react'
import { atom } from 'recoil'

// const SidebarContext = createContext('default')

// export function NotebookProvider () {
//   const [notebook, setNotebook] = useState<string>('default')

//   return (
//     <SidebarContext.Provider value={notebook}>
//       <SidebarNav />
//     </SidebarContext.Provider>
//   )
// }

// function SidebarNav () {
//   const { isOpen } = useContext(SidebarContext)

//   return (
//     <div>
//       <p>Home</p>

//       {isOpen && <Subnav />}
//     </div>
//   )
// }

const nameAtom = atom({
  key: 'name',
  default: ''
})

export { nameAtom }
