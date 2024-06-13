import {IDomain} from "@/services/server/domain/domain";

export class SystemDomain implements IDomain {
    rootPath: string = ''

    constructor(rootPath: string) {
        this.rootPath = rootPath
    }

    async makeGet<T>(url: string): Promise<T> {
        return fetch(url).then(response => response.json());
    }
}