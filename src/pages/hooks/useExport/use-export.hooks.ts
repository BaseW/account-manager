import { invoke } from "@tauri-apps/api/tauri";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { useCallback } from "react";
import { ExportState } from "./use-export.types";

export const useExport = (): ExportState => {
  const exportAccounts = useCallback(() => {
    invoke("export_accounts", {})
      .then((fileContent) => {
        // print content length
        console.log((fileContent as string).length);
        writeTextFile("export.csv", fileContent as string, {
          dir: BaseDirectory.Download
        })
          .then(() => console.log("export ok"))
          .catch((err) => console.log(err));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return {
    exportAccounts
  };
};
