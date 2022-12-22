import { AccountMap } from "../../../types";

export interface AccountExporterProps {
  accountMap: AccountMap | null;
  onExportAccounts: () => void;
}
