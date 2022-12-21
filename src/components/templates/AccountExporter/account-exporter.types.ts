import { AccountMap } from "../../../types";

export type AccountExporterProps = {
  accountMap: AccountMap;
  onToggleMode: () => void;
  exportAccounts: () => void;
}
