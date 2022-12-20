export type Account = {
  url: string;
  username: string;
  source: 'icloud' | 'chrome' | 'firefox'
}

export type AccountPartial = {
  username: string;
  source: 'icloud' | 'chrome' | 'firefox'
}

export type AccountMap = {
  // key is url
  [key: string]: AccountPartial[];
}
