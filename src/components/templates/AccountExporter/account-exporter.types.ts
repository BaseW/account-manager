import { AccountMap } from "../../../types";

export interface AccountExporterProps {
  accountMap: AccountMap;
  onToggleMode: () => void;
  exportAccounts: () => void;
}
