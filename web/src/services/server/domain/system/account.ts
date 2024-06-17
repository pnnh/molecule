import parseURI from "parse-uri";
import {SystemDomain, SystemPathParams} from "@/services/server/domain/system";
import {base58ToString, generateUuid, stringToBase58, stringToMd5} from "@/utils/basex";
import {SessionModel} from "@/models/session";
import {AccountModel} from "@/models/account";

export class SystemAccountService {
    systemDomain: SystemDomain

    constructor(systemDomain: SystemDomain) {
        this.systemDomain = systemDomain
    }

    makeGet<T>(url: parseURI.URI, pathParams: SystemPathParams | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async userSession(pathParams: SystemPathParams | undefined) {
        const userSession: SessionModel = {
            account: {
                uid: stringToMd5('anonymous'),
                urn: stringToBase58('anonymous@system'),
                create_time: '',
                update_time: '',
                username: '',
                image: '',
                description: '',
                mail: '',
                nickname: 'anonymous',
                photo: '',
                role: 'anonymous'
            },
            name: 'anonymous',
            token: '',
            domain: 'system',
        }
        return userSession
    }

    async accountInformation(pathParams: SystemPathParams | undefined) {
        const userSession: AccountModel = {
            uid: stringToMd5('anonymous'),
            urn: stringToBase58('anonymous'),
            create_time: '',
            update_time: '',
            username: '',
            image: '/photos/8.png',
            description: '',
            mail: '',
            nickname: 'anonymous',
            photo: '',
            role: 'anonymous',
        }
        return userSession
    }
}
