import { SessionModel } from '@/models/session'
import { atom } from 'recoil'

const sessionAtom = atom <SessionModel>({
    key: 'session',
    default: {
        account: {
            uid: '',
            username: '',
            nid: 0,
            create_time: '',
            update_time: '',
            image: '',
            description: '',
            mail: '',
            nickname: '',
            pk: '',
            photo: ''
        },
        token: ''
    }
})

export { sessionAtom }