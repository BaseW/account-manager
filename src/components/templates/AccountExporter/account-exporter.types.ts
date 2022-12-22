import { AccountMap } from "../../../types";

export interface AccountExporterProps {
  accountMap: AccountMap | undefined;
  onExportAccounts: () => void;
}
