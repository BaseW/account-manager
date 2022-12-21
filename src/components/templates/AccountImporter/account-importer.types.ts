import { Account, AccountSource } from "../../../types";

export type AccountImporterProps = {
  accounts: Account[];
  onImportAccounts: (csvData: string | ArrayBuffer | null, source: AccountSource) => void;
  onResetAccounts: () => void;
  onToggleMode: () => void;
}
