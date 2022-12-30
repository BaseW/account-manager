import { ChangeEvent } from "react";
import { Account, AccountMap } from "../../../types";

export interface AccountFiltererProps {
  accounts: Account[];
  accountMap: AccountMap | null;
  onFilterAccounts: (
    isIcloudIncluded: boolean,
    isChromeIncluded: boolean,
    isFirefoxIncluded: boolean
  ) => void;
}

export interface AccountFiltererState {
  isIcloudIncluded: boolean;
  isChromeIncluded: boolean;
  isFirefoxIncluded: boolean;
  onChangeChromeCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeIcloudCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFirefoxCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  onFilterAccountsCallback: () => void;
}
