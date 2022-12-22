import { Account, AccountMap, AccountSource, PageMode } from "../../types";

export interface HomeState {
  mode: PageMode;
  accounts: Account[];
  accountMap: AccountMap | null;
  updateMode: (newMode: PageMode) => void;
  startImport: (
    csvData: string | ArrayBuffer | null,
    source: AccountSource | null
  ) => void;
  onResetAccounts: () => void;
  onFilterAccounts: (
    isIcloudIncluded: boolean,
    isChromeIncluded: boolean,
    isFirefoxIncluded: boolean
  ) => void;
  exportAccounts: () => void;
}
