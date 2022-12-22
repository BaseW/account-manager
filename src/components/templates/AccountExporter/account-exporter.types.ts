import { AccountMap } from "../../../types";

export interface AccountExporterProps {
  accountMap: AccountMap | undefined;
  onToggleMode: () => void;
  exportAccounts: () => void;
}
