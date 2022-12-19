import { invoke } from "@tauri-apps/api";
import { ChangeEvent, useState } from "react";
import { Account } from "../../../types";

export const useAccountImporter = (accounts: Account[], updateAccounts: (accounts: Account[]) => void) => {
  const [isUploading, setIsUploading] = useState(false);
  const [source, setSource] = useState(''); // ['icloud', 'chrome', 'firefox'
  const [csvData, setCsvData] = useState<string | ArrayBuffer | null>(null);

  function onUploadFile(e: ChangeEvent<HTMLInputElement>) {
    setIsUploading(true);
    const file = e.target.files[0];

    const fileName = file.name;
    let from = '';
    // get type from file name
    if (fileName.includes('icloud')) {
      from = 'icloud';
    } else if (fileName.includes('chrome')) {
      from = 'chrome';
    } else if (fileName.includes('firefox')) {
      from = 'firefox';
    }

    if (from === '') {
      setIsUploading(false);
      return;
    }

    setSource(from);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      setIsUploading(false);
      setCsvData(text);
    };
    reader.readAsText(file);
  }

  function startImport() {
    console.log('start importing');
    invoke("import_accounts", { csvData, source }).then((res) => {
      const newlyImportedAccounts = res as Account[];
      const concatenedAccounts = [...accounts, ...newlyImportedAccounts];
      updateAccounts(concatenedAccounts);
    });
  }

  function onResetAccounts() {
    updateAccounts([]);
  }

  return {
    isUploading,
    csvData,
    accounts,
    onUploadFile,
    startImport,
    onResetAccounts
  }
}
