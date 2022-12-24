import { AccountMap } from "../../../types";

export interface UseExportProps {
  accountMap: AccountMap | null;
}

export interface ExportState {
  exportAccounts: () => void;
}
