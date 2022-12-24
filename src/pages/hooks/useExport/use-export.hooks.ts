import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { useCallback } from "react";
import { AccountMap } from "../../../types";
import { ExportState, UseExportProps } from "./use-export.types";

export const useExport = ({ accountMap }: UseExportProps): ExportState => {
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
  }, [accountMap]);

  return {
    exportAccounts
  };
};
