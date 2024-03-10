import { atom } from 'recoil'

const directoryAtom = atom({
  key: 'directory',
  default: ''
})

const noteAtom = atom({
  key: 'note',
  default: ''
})

const notebookAtom = atom({
  key: 'notebook',
  default: ''
})

export { noteAtom, directoryAtom, notebookAtom }
