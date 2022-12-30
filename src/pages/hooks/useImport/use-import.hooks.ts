import { invoke } from "@tauri-apps/api/tauri";
import { useCallback } from "react";
import { Account, AccountSource } from "../../../types";
import { ImportState, UseImportProps } from "./use-import.types";

export const useImport = ({
  accounts,
  updateAccounts
}: UseImportProps): ImportState => {
  const startImport = useCallback(
    (
      csvData: string | ArrayBuffer | null,
      source: AccountSource | null
    ): void => {
      console.log("start importing");

      if (csvData === null ?? source === null) {
        console.log("source is null");
        return;
      }

      invoke("import_accounts", { csvData, source })
        .then((res) => {
          const newlyImportedAccounts = res as Account[];
          const concatenedAccounts = [...accounts, ...newlyImportedAccounts];
          updateAccounts(concatenedAccounts);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [accounts, updateAccounts]
  );

  const onResetAccounts = useCallback(() => {
    invoke("reset_accounts")
      .then(() => {})
      .catch(() => {});
    updateAccounts([]);
  }, [updateAccounts]);

  return {
    startImport,
    onResetAccounts
  };
};
