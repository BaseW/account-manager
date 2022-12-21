import { Account, AccountSource } from "../../../types";

export interface AccountImporterProps {
  accounts: Account[];
  onImportAccounts: (
    csvData: string | ArrayBuffer | null,
    source: AccountSource
  ) => void;
  onResetAccounts: () => void;
  onToggleMode: () => void;
}
