import { atom } from 'recoil'

const directoryAtom = atom({
  key: 'directory',
  default: ''
})

const noteAtom = atom({
  key: 'note',
  default: ''
})

export { noteAtom, directoryAtom }
