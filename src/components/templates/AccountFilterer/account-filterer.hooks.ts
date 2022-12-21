import { ChangeEvent, useState } from "react";
import { AccountFiltererState } from "./account-filterer.types";

export const useAccountFilterer = (
  onFilterAccounts: (
    isIcloudIncluded: boolean,
    isChromeIncluded: boolean,
    isFirefoxIncluded: boolean
  ) => void
): AccountFiltererState => {
  const [isIcloudIncluded, setIsIcloudIncluded] = useState(true);
  const [isChromeIncluded, setIsChromeIncluded] = useState(true);
  const [isFirefoxIncluded, setIsFirefoxIncluded] = useState(true);

  function onChangeIcloudCheckbox(e: ChangeEvent<HTMLInputElement>): void {
    setIsIcloudIncluded(e.target.checked);
  }

  function onChangeChromeCheckbox(e: ChangeEvent<HTMLInputElement>): void {
    setIsChromeIncluded(e.target.checked);
  }

  function onChangeFirefoxCheckbox(e: ChangeEvent<HTMLInputElement>): void {
    setIsFirefoxIncluded(e.target.checked);
  }

  function onFilterAccountsCallback(): void {
    onFilterAccounts(isIcloudIncluded, isChromeIncluded, isFirefoxIncluded);
  }

  return {
    onChangeChromeCheckbox,
    onChangeIcloudCheckbox,
    onChangeFirefoxCheckbox,
    onFilterAccountsCallback,
  };
};
