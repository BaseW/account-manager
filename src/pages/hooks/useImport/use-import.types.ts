import { Account, AccountSource } from "../../../types";

export interface UseImportProps {
  accounts: Account[];
  updateAccounts: (newAccounts: Account[]) => void;
}

export interface ImportState {
  startImport: (
    csvData: string | ArrayBuffer | null,
    source: AccountSource | null
  ) => void;
  onResetAccounts: () => void;
}
