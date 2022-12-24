import { invoke } from "@tauri-apps/api/tauri";
import { useCallback } from "react";
import { Account, AccountSource } from "../../../types";
import { ImportState, UseImportProps } from "./use-import.types";

export const useImport = ({
  accounts,
  updateAccounts
}: UseImportProps): ImportState => {
  function startImport(
    csvData: string | ArrayBuffer | null,
    source: AccountSource | null
  ): void {
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
  }

  const onResetAccounts = useCallback(() => {
    updateAccounts([]);
  }, []);

  return {
    startImport,
    onResetAccounts
  };
};
