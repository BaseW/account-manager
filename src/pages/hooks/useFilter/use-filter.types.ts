import { Account, AccountMap } from "../../../types";

export interface UseFilterProps {
  accounts: Account[];
  updateAccountMap: (newAccountMap: AccountMap) => void;
}

export interface FilterState {
  onFilterAccounts: (
    isIcloudIncluded: boolean,
    isChromeIncluded: boolean,
    isFirefoxIncluded: boolean
  ) => void;
}
