import { useState, useCallback } from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { PageMode, Account, AccountMap } from "../../types/";
import { HomeState } from "./home.types";
import { useImport } from "./useImport";
import { useFilter } from "./useFilter";

export const useHome = (): HomeState => {
  const [mode, setMode] = useState<PageMode>("import");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountMap, setAccountMap] = useState<AccountMap | null>(null);

  const updateMode = useCallback((newMode: PageMode) => {
    setMode(newMode);
  }, []);

  const updateAccounts = useCallback((newAccounts: Account[]) => {
    setAccounts(newAccounts);
  }, []);

  const updateAccountMap = useCallback((newAccountMap: AccountMap) => {
    setAccountMap(newAccountMap);
  }, []);

  const { startImport, onResetAccounts } = useImport({
    accounts,
    updateAccounts
  });
  const { onFilterAccounts } = useFilter({
    accounts,
    updateAccountMap
  });

  const convertAccountMapToCsv = useCallback(
    (accountMap: AccountMap | null): string => {
      // header: "url,username,source"
      const header = "url,username,source";

      // if accountMap is null, return header only
      if (accountMap === null) {
        return header;
      }

      // accountMap has the following structure:
      // {
      //   "icloud.com": [
      //     {
      //       username: "test",
      //       source: "icloud"
      //     }
      //   ],...
      // }
      // convert to csv format like:
      // "https://www.icloud.com,test,icloud"
      const accountMapEntries = Object.entries(accountMap);
      const accountMapCsv = accountMapEntries.reduce((acc, [key, value]) => {
        const accountCsv = value.reduce((acc, account) => {
          const { username, source } = account;
          return `${acc}\n${key},${username},${source}`;
        }, "");
        return `${acc}${accountCsv}`;
      }, header);
      console.log(accountMapCsv.length);
      return accountMapCsv;
    },
    []
  );

  const exportAccounts = useCallback(() => {
    const fileContent = convertAccountMapToCsv(accountMap);
    writeTextFile("export.csv", fileContent, {
      dir: BaseDirectory.Download
    })
      .then(() => console.log("export ok"))
      .catch((err) => console.log(err));
  }, []);

  return {
    mode,
    accounts,
    accountMap,
    updateMode,
    startImport,
    onResetAccounts,
    onFilterAccounts,
    exportAccounts
  };
};
