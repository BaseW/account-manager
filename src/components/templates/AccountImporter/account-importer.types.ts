import { ChangeEvent } from "react";
import { Account, AccountSource } from "../../../types";

export interface AccountImporterProps {
  accounts: Account[];
  onImportAccounts: (
    csvData: string | ArrayBuffer | null,
    source: AccountSource | null
  ) => void;
  onResetAccounts: () => void;
  onToggleMode: () => void;
}

export interface AccountImporterState {
  isUploading: boolean;
  source: AccountSource | null;
  csvData: string | ArrayBuffer | null;
  onUploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
}
