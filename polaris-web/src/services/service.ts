export class ModelService {
  baseUrl = ''
  entity = ''

  constructor (baseUrl: string, entity: string) {
    this.baseUrl = baseUrl
    this.entity = entity
  }

  contentViewUrl (channel: string, pk: string) {
    return `/content/channel/${channel}/${this.entity}/` + pk
  }

  consoleViewUrl (pk: string) {
    return `/console/${this.entity}/` + pk
  }

  get consoleNewUrl () { return `/${this.entity}/new` }

  consoleEditUrl (pk: string) {
    return `/console/${this.entity}/${pk}/edit`
  }

  get restfulInsertUrl () {
    return `${this.baseUrl}/restful/${this.entity}`
  }

  restfulUpdateUrl (pk: string) {
    return `${this.baseUrl}/restful/${this.entity}/` + pk
  }

  restfulGetUrl (pk: string) {
    return `${this.baseUrl}/restful/${this.entity}/` + pk
  }

  restfulDeleteUrl (pk: string) {
    return `/${this.baseUrl}/restful/${this.entity}/` + pk
  }

  get restfulSelectUrl () {
    return `${this.baseUrl}/restful/${this.entity}`
  }
}
