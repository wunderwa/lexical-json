export type Genre = {
  name: string
  en: string
  ru: string
  group?: {
    ru: string
    en: string
  }
}

type Fb2GenreGroup = {
  en: string
  ru: string
  children: Genre[]
}

export const genres: Fb2GenreGroup[] = [
  {
    en: 'Science Fiction & Fantasy',
    ru: 'Фантастика (Научная фантастика и Фэнтези)',
    children: [
      {
        name: 'sf_history',
        en: '- Alternative history',
        ru: '- Альтернативная история',
      },
      {
        name: 'sf_action',
        en: '- Action',
        ru: '- Боевая фантастика',
      },
      {
        name: 'sf_epic',
        en: '- Epic',
        ru: '- Эпическая фантастика',
      },
      {
        name: 'sf_heroic',
        en: '- Heroic',
        ru: '- Героическая фантастика',
      },
      {
        name: 'sf_detective',
        en: '- Detective',
        ru: '- Детективная фантастика',
      },
      {
        name: 'sf_cyberpunk',
        en: '- Cyberpunk',
        ru: '- Киберпанк',
      },
      {
        name: 'sf_space',
        en: '- Space',
        ru: '- Космическая фантастика',
      },
      {
        name: 'sf_social',
        en: '- Social-philosophical',
        ru: '- Социально-психологическая фантастика',
      },
      {
        name: 'sf_horror',
        en: '- Horror & mystic',
        ru: '- Ужасы и Мистика',
      },
      {
        name: 'sf_humor',
        en: '- Humor',
        ru: '- Юмористическая фантастика',
      },
      {
        name: 'sf_fantasy',
        en: '- Fantasy',
        ru: '- Фэнтези',
      },
      {
        name: 'sf',
        en: '- Science Fiction',
        ru: '- Научная Фантастика',
      },
    ],
  },
  {
    en: 'Detectives & Thrillers',
    ru: 'Детективы и Триллеры',
    children: [
      {
        name: 'det_classic',
        en: '- Classical detectives',
        ru: '- Классический детектив',
      },
      {
        name: 'det_police',
        en: '- Police Stories',
        ru: '- Полицейский детектив',
      },
      {
        name: 'det_action',
        en: '- Action',
        ru: '- Боевик',
      },
      {
        name: 'det_irony',
        en: '- Ironical detectives',
        ru: '- Иронический детектив',
      },
      {
        name: 'det_history',
        en: '- Historical detectives',
        ru: '- Исторический детектив',
      },
      {
        name: 'det_espionage',
        en: '- Espionage detectives',
        ru: '- Шпионский детектив',
      },
      {
        name: 'det_crime',
        en: '- Crime detectives',
        ru: '- Криминальный детектив',
      },
      {
        name: 'det_political',
        en: '- Political detectives',
        ru: '- Политический детектив',
      },
      {
        name: 'det_maniac',
        en: '- Maniacs',
        ru: '- Маньяки',
      },
      {
        name: 'det_hard',
        en: '- Hard-boiled',
        ru: '- Крутой детектив',
      },
      {
        name: 'thriller',
        en: '- Thrillers',
        ru: '- Триллер',
      },
      {
        name: 'detective',
        en: '- Detectives',
        ru: '- Детектив (не относящийся в прочие категории).',
      },
    ],
  },
  {
    en: 'Prose',
    ru: '- Классическая проза',
    children: [
      {
        name: 'prose_classic',
        en: '- Classics prose',
        ru: '- Классическая проза',
      },
      {
        name: 'prose_history',
        en: '- Historical prose',
        ru: '- Историческая проза',
      },
      {
        name: 'prose_contemporary',
        en: '- Contemporary prose',
        ru: '- Современная проза',
      },
      {
        name: 'prose_counter',
        en: '- Counterculture',
        ru: '- Контркультура',
      },
      {
        name: 'prose_rus_classic',
        en: '- Russian classics prose',
        ru: '- Русская классическая проза',
      },
      {
        name: 'prose_su_classics',
        en: '- Soviet classics prose',
        ru: '- Советская классическая проза',
      },
    ],
  },
  {
    en: 'Romance',
    ru: 'Любовные романы',
    children: [
      {
        name: 'love_contemporary',
        en: '- Contemporary Romance',
        ru: '- Современные любовные романы',
      },
      {
        name: 'love_history',
        en: '- Historical Romance',
        ru: '- Исторические любовные романы',
      },
      {
        name: 'love_detective',
        en: '- Detective Romance',
        ru: '- Остросюжетные любовные романы',
      },
      {
        name: 'love_short',
        en: '- Short Romance',
        ru: '- Короткие любовные романы',
      },
      {
        name: 'love_erotica',
        en: '- Erotica',
        ru: '- Эротика',
      },
    ],
  },
  {
    en: 'Adventure',
    ru: 'Приключения',
    children: [
      {
        name: 'adv_western',
        en: '- Western',
        ru: '- Вестерн',
      },
      {
        name: 'adv_history',
        en: '- History',
        ru: '- Исторические приключения',
      },
      {
        name: 'adv_indian',
        en: '- Indians',
        ru: '- Приключения про индейцев',
      },
      {
        name: 'adv_maritime',
        en: '- Maritime Fiction',
        ru: '- Морские приключения',
      },
      {
        name: 'adv_geo',
        en: '- Travel & geography',
        ru: '- Путешествия и география',
      },
      {
        name: 'adv_animal',
        en: '- Nature & animals',
        ru: '- Природа и животные',
      },
      {
        name: 'adventure',
        en: '- Other',
        ru: '- Прочие приключения (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: "Children's",
    ru: 'Детское',
    children: [
      {
        name: 'child_tale',
        en: '- Fairy Tales',
        ru: '- Сказка',
      },
      {
        name: 'child_verse',
        en: '- Verses',
        ru: '- Детские стихи',
      },
      {
        name: 'child_prose',
        en: '- Prose',
        ru: '- Детскиая проза',
      },
      {
        name: 'child_sf',
        en: '- Science Fiction',
        ru: '- Детская фантастика',
      },
      {
        name: 'child_det',
        en: '- Detectives & Thrillers',
        ru: '- Детские остросюжетные',
      },
      {
        name: 'child_adv',
        en: '- Adventures',
        ru: '- Детские приключения',
      },
      {
        name: 'child_education',
        en: '- Educational',
        ru: '- Детская образовательная литература',
      },
      {
        name: 'children',
        en: '- Other',
        ru: '- Прочая детская литература (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Poetry & Dramaturgy',
    ru: 'Поэзия, Драматургия',
    children: [
      {
        name: 'poetry',
        en: '- Poetry',
        ru: '- Поэзия',
      },
      {
        name: 'dramaturgy',
        en: '- Dramaturgy',
        ru: '- Драматургия',
      },
    ],
  },
  {
    en: 'Antique literature',
    ru: 'Старинное',
    children: [
      {
        name: 'antique_ant',
        en: '- Antique',
        ru: '- Античная литература',
      },
      {
        name: 'antique_european',
        en: '- European',
        ru: '- Европейская старинная литература',
      },
      {
        name: 'antique_russian',
        en: '- Old russian',
        ru: '- Древнерусская литература',
      },
      {
        name: 'antique_east',
        en: '- Old east',
        ru: '- Древневосточная литература',
      },
      {
        name: 'antique_myths',
        en: '- Myths. Legends. Epos',
        ru: '- Мифы. Легенды. Эпос',
      },
      {
        name: 'antique',
        en: '- Other',
        ru: '- Прочая старинная литература (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Scientific-educational',
    ru: 'Наука, Образование',
    children: [
      {
        name: 'sci_history',
        en: '- History',
        ru: '- История',
      },
      {
        name: 'sci_psychology',
        en: '- Psychology',
        ru: '- Психология',
      },
      {
        name: 'sci_culture',
        en: '- Cultural science',
        ru: '- Культурология',
      },
      {
        name: 'sci_religion',
        en: '- Religious studies',
        ru: '- Религиоведение',
      },
      {
        name: 'sci_philosophy',
        en: '- Philosophy',
        ru: '- Философия',
      },
      {
        name: 'sci_politics',
        en: '- Politics',
        ru: '- Политика',
      },
      {
        name: 'sci_business',
        en: '- Business literature',
        ru: '- Деловая литература',
      },
      {
        name: 'sci_juris',
        en: '- Jurisprudence',
        ru: '- Юриспруденция',
      },
      {
        name: 'sci_linguistic',
        en: '- Linguistics',
        ru: '- Языкознание',
      },
      {
        name: 'sci_medicine',
        en: '- Medicine',
        ru: '- Медицина',
      },
      {
        name: 'sci_phys',
        en: '- Physics',
        ru: '- Физика',
      },
      {
        name: 'sci_math',
        en: '- Mathematics',
        ru: '- Математика',
      },
      {
        name: 'sci_chem',
        en: '- Chemistry',
        ru: '- Химия',
      },
      {
        name: 'sci_biology',
        en: '- Biology',
        ru: '- Биология',
      },
      {
        name: 'sci_tech',
        en: '- Technical',
        ru: '- Технические науки',
      },
      {
        name: 'science',
        en: '- Other',
        ru: '- Прочая научная литература (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Computers & Internet',
    ru: 'Компьютеры и Интернет',
    children: [
      {
        name: 'comp_www',
        en: '- Internet',
        ru: '- Интернет',
      },
      {
        name: 'comp_programming',
        en: '- Programming',
        ru: '- Программирование',
      },
      {
        name: 'comp_hard',
        en: '- Hardware',
        ru: '- Компьютерное "железо" (аппаратное обеспечение)',
      },
      {
        name: 'comp_soft',
        en: '- Software',
        ru: '- Программы',
      },
      {
        name: 'comp_db',
        en: '- Databases',
        ru: '- Базы данных',
      },
      {
        name: 'comp_osnet',
        en: '- OS & Networking',
        ru: '- ОС и Сети',
      },
      {
        name: 'computers',
        en: '- Other',
        ru: '- Прочая околокомпьтерная литература (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Reference',
    ru: 'Справочная литература',
    children: [
      {
        name: 'ref_encyc',
        en: '- Encyclopedias',
        ru: '- Энциклопедии',
      },
      {
        name: 'ref_dict',
        en: '- Dictionaries',
        ru: '- Словари',
      },
      {
        name: 'ref_ref',
        en: '- Reference',
        ru: '- Справочники',
      },
      {
        name: 'ref_guide',
        en: '- Guidebooks',
        ru: '- Руководства',
      },
      {
        name: 'reference',
        en: '- Other',
        ru: '- Прочая справочная литература (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Nonfiction',
    ru: 'Документальная литература',
    children: [
      {
        name: 'nonf_biography',
        en: '- Biography & Memoirs',
        ru: '- Биографии и Мемуары',
      },
      {
        name: 'nonf_publicism',
        en: '- Publicism',
        ru: '- Публицистика',
      },
      {
        name: 'nonf_criticism',
        en: '- Criticism',
        ru: '- Критика',
      },
      {
        name: 'design',
        en: '- Art & design',
        ru: '- Искусство и Дизайн',
      },
      {
        name: 'nonfiction',
        en: '- Other',
        ru: '- Прочая документальная литература (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Religion & Inspiration',
    ru: 'Религия и духовность',
    children: [
      {
        name: 'religion_rel',
        en: '- Religion',
        ru: '- Религия',
      },
      {
        name: 'religion_esoterics',
        en: '- Esoterics',
        ru: '- Эзотерика',
      },
      {
        name: 'religion_self',
        en: '- Self-improvement',
        ru: '- Самосовершенствование',
      },
      {
        name: 'religion',
        en: '- Other',
        ru: '- Прочая религионая литература (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Humor',
    ru: 'Юмор',
    children: [
      {
        name: 'humor_anecdote',
        en: '- Anecdote (funny stories)',
        ru: '- Анекдоты',
      },
      {
        name: 'humor_prose',
        en: '- Prose',
        ru: '- Юмористическая проза',
      },
      {
        name: 'humor_verse',
        en: '- Verses',
        ru: '- Юмористические стихи',
      },
      {
        name: 'humor',
        en: '- Other',
        ru: '- Прочий юмор (то, что не вошло в другие категории)',
      },
    ],
  },
  {
    en: 'Home & Family',
    ru: 'Домоводство (Дом и семья)',
    children: [
      {
        name: 'home_cooking',
        en: '- Cooking',
        ru: '- Кулинария',
      },
      {
        name: 'home_pets',
        en: '- Pets',
        ru: '- Домашние животные',
      },
      {
        name: 'home_crafts',
        en: '- Hobbies & Crafts',
        ru: '- Хобби и ремесла',
      },
      {
        name: 'home_entertain',
        en: '- Entertaining',
        ru: '- Развлечения',
      },
      {
        name: 'home_health',
        en: '- Health',
        ru: '- Здоровье',
      },
      {
        name: 'home_garden',
        en: '- Garden',
        ru: '- Сад и огород',
      },
      {
        name: 'home_diy',
        en: '- Do it yourself',
        ru: '- Сделай сам',
      },
      {
        name: 'home_sport',
        en: '- Sports',
        ru: '- Спорт',
      },
      {
        name: 'home_sex',
        en: '- Erotica & sex',
        ru: '- Эротика, Секс',
      },
      {
        name: 'home',
        en: '- Other',
        ru: '- Прочее домоводство (то, что не вошло в другие категории)',
      },
    ],
  },
]

export const getGenres = (withGroup = false): Genre[] =>
  genres.reduce(
    (acc: Genre[], { children, ru, en }: Fb2GenreGroup) => [
      ...acc,
      ...children.map(g =>
        withGroup
          ? {
              ...g,
              group: { ru, en },
            }
          : g,
      ),
    ],
    [],
  )

console.log(getGenres(true))
