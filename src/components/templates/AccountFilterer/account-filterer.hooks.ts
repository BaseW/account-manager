import { invoke } from "@tauri-apps/api/tauri";
import { ChangeEvent, useState } from "react";
import { Account, AccountMap } from "../../../types";

export const useAccountFilterer = (onFilterAccounts: (isIcloudIncluded: boolean, isChromeIncluded: boolean, isFirefoxIncluded: boolean) => void) => {
  const [isIcloudIncluded, setIsIcloudIncluded] = useState(true);
  const [isChromeIncluded, setIsChromeIncluded] = useState(true);
  const [isFirefoxIncluded, setIsFirefoxIncluded] = useState(true);

  function onChangeIcloudCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setIsIcloudIncluded(e.target.checked);
  }

  function onChangeChromeCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setIsChromeIncluded(e.target.checked);
  }

  function onChangeFirefoxCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setIsFirefoxIncluded(e.target.checked);
  }

  function onFilterAccountsCallback() {
    onFilterAccounts(isIcloudIncluded, isChromeIncluded, isFirefoxIncluded);
  };

  return {
    onChangeChromeCheckbox,
    onChangeIcloudCheckbox,
    onChangeFirefoxCheckbox,
    onFilterAccountsCallback,
  }
}
