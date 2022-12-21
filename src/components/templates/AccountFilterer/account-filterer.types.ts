import { Account, AccountMap } from "../../../types"

export type AccountFiltererProps = {
  accounts: Account[];
  accountMap: AccountMap;
  onFilterAccounts: (isIcloudIncluded: boolean, isChromeIncluded: boolean, isFirefoxIncluded: boolean) => void;
  onToggleMode: () => void;
}
