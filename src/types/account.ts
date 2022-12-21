export interface Account {
  url: string;
  username: string;
  source: "icloud" | "chrome" | "firefox";
}

export interface AccountPartial {
  username: string;
  source: "icloud" | "chrome" | "firefox";
}

export type AccountMap = Record<string, AccountPartial[]>;
