import { invoke } from "@tauri-apps/api/tauri";
import { ChangeEvent, useState } from "react";
import { Account, AccountMap } from "../../../types";

export const useAccountFilterer = (accounts: Account[]) => {
  const [isIcloudIncluded, setIsIcloudIncluded] = useState(true);
  const [isChromeIncluded, setIsChromeIncluded] = useState(true);
  const [isFirefoxIncluded, setIsFirefoxIncluded] = useState(true);
  const [accountMap, setAccountMap] = useState<AccountMap>();

  function onChangeIcloudCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setIsIcloudIncluded(e.target.checked);
  }

  function onChangeChromeCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setIsChromeIncluded(e.target.checked);
  }

  function onChangeFirefoxCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setIsFirefoxIncluded(e.target.checked);
  }

  function onFilterAccounts() {
    invoke("filter_accounts", { accounts, isIcloudIncluded, isChromeIncluded, isFirefoxIncluded }).then((res) => {
      const filteredAccountMap = res as AccountMap;
      setAccountMap(filteredAccountMap);
    });
  }

  return {
    accountMap,
    onChangeChromeCheckbox,
    onChangeIcloudCheckbox,
    onChangeFirefoxCheckbox,
    onFilterAccounts,
  }
}
