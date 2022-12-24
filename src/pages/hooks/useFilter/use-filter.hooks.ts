import { invoke } from "@tauri-apps/api/tauri";
import { useCallback } from "react";
import { AccountMap } from "../../../types";
import { FilterState, UseFilterProps } from "./use-filter.types";

export const useFilter = ({
  accounts,
  updateAccountMap
}: UseFilterProps): FilterState => {
  const onFilterAccounts = useCallback(
    (
      isIcloudIncluded: boolean,
      isChromeIncluded: boolean,
      isFirefoxIncluded: boolean
    ): void => {
      invoke("filter_accounts", {
        accounts,
        isIcloudIncluded,
        isChromeIncluded,
        isFirefoxIncluded
      })
        .then((res) => {
          const filteredAccountMap = res as AccountMap;
          updateAccountMap(filteredAccountMap);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [accounts, updateAccountMap]
  );

  return {
    onFilterAccounts
  };
};
