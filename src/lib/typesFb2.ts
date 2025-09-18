export type Fb2Creator = {
  firstName?: string
  middleName?: string
  lastName?: string
  nickname?: string
  homePage?: string | string[]
  email?: string | string[]
  id?: string
}

export type Fb2Creators = Fb2Creator | Fb2Creator[]

export type Fb2Sequence = {
  name: string
  number?: number
}

export type Fb2TitleInfo = {
  genre: string[]
  author: Fb2Creators
  bookTitle: string
  annotation?: string
  keywords?: string
  date?: string
  coverpage?: string
  lang: string
  srcLang?: string
  translator?: Fb2Creators
  sequence?: Fb2Sequence | Fb2Sequence[]
}

export type Fb2DocumentInfo = {
  author: Fb2Creators
  programUsed?: string
  date: string
  srcUrl?: string | string[]
  srcOcr?: string
  id: string
  version: string
  history?: string
  publisher?: Fb2Creators
}

export type Fb2PublishInfo = {
  bookName: string
  publisher: string
  city: string
  year: string
  isbn: string
}

export type Fb2Description = {
  titleInfo: Fb2TitleInfo
  documentInfo: Fb2DocumentInfo
  publishInfo?: Fb2PublishInfo
  customInfo?: string[]
}
