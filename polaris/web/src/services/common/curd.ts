export class PageUrl {
  entity = ''

  constructor (entity: string) {
    this.entity = entity
  }

  contentRead (channel: string, pk: string) {
    return `/content/channel/${channel}/${this.entity}/` + pk
  }

  consoleRead (pk: string) {
    return `/console/${this.entity}/` + pk
  }

  get consoleNew () { return `/${this.entity}/new` }

  consoleEdit (pk: string) {
    return `/console/${this.entity}/${pk}/edit`
  }

  adminRead (pk: string) {
    return `/admin/${this.entity}/` + pk
  }
}

export class CommonUrl {
  host = ''
  entity = ''

  constructor (host: string, entity: string) {
    this.host = host
    this.entity = entity
  }

  get contentPostUrl () {
    return `${this.host}/restful/${this.entity}`
  }

  contentUpdateUrl (pk: string) {
    return `${this.host}/restful/${this.entity}/` + pk
  }

  contentGetUrl (pk: string) {
    return `${this.host}/restful/${this.entity}/` + pk
  }

  get consoleUpdateUrl () { return `${this.host}/restful/${this.entity}/update` }
  get consoleShareUrl () { return `${this.host}/restful/${this.entity}/share` }
  get consolePutUrl () { return `${this.host}/restful/${this.entity}/write` }

  consoleGetUrl (pk: string) {
    return `${this.host}/restful/${this.entity}/` + pk
  }

  consoleDeleteUrl (pk: string) {
    return `/${this.host}/restful/${this.entity}/` + pk
  }

  get adminSelectUrl () {
    return `${this.host}/restful/${this.entity}`
  }
}
