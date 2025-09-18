import { Fb2Description, Fb2DocumentInfo, Fb2PublishInfo, Fb2TitleInfo } from '../lib'
import { coverpage } from './testCoverpage'

const titleInfo: Fb2TitleInfo = {
  genre: ['management'],
  author: [
    {
      firstName: 'Ivan',
      lastName: 'Ivanov',
    },
    {
      firstName: 'Petr',
      lastName: 'Petrov',
    },
  ],
  bookTitle: 'Book title',
  annotation: 'Paragraph 1\nParagraph 2',
  keywords: 'key1, key2, key3, key4, key5, key6, key7, key8, key9',
  date: '2014-01-01',
  coverpage,
  lang: 'ru',
  srcLang: 'en',
  translator: {
    firstName: 'Sidor',
    lastName: 'Sidorov',
  },
  sequence: {
    name: 'Series',
    number: 1,
  },
}

const documentInfo: Fb2DocumentInfo = {
  author: [
    {
      firstName: 'Олег',
      lastName: 'Власов',
      nickname: 'Nick',
    },
  ],
  programUsed: 'FictionBook Editor Release 2.6.2',
  date: '2014-12-09',
  srcUrl: ['https://example.com'],
  srcOcr: 'Something about src',
  id: 'fb9ef105-7f82-11e4-82c4-002590591ed2',
  version: '1.0',
  history: 'V 1.0 by pro-nike',
  publisher: {
    firstName: '',
    lastName: 'Издательство «Питер»',
    id: '046ebc0b-b024-102a-94d5-07de47c81719',
  },
}

const publishInfo: Fb2PublishInfo = {
  bookName: 'Book title. / Ivan Ivanov',
  publisher: 'Piter',
  city: 'St. Petersburg',
  year: '2014',
  isbn: '978-5-496-01323-9',
}
//----
export const descriptionMax: Fb2Description = {
  titleInfo,
  documentInfo,
  publishInfo,
  customInfo: ['© ООО Publishing House «Piter», 2014 All rights reserved.'],
}

export const descriptionMin: Fb2Description = {
  titleInfo: {
    genre: ['management'],
    author: {
      firstName: 'Ivan',
      lastName: 'Ivanov',
    },
    bookTitle: 'Book title min',
    lang: 'ru',
  },
  documentInfo: {
    author: {
      firstName: 'John',
      lastName: 'Minion',
    },
    date: '2014-12-09',
    id: 'fb9ef105-7f82-11e4-82c4-002590591ed2',
    version: '1.0',
  },
}
