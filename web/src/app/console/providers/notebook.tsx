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

const libraryAtom = atom({
  key: 'library',
  default: ''
})

export { noteAtom, directoryAtom, notebookAtom, libraryAtom }
