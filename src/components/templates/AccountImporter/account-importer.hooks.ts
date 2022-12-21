import { invoke } from "@tauri-apps/api/tauri";
import { ChangeEvent, useState } from "react";
import { Account, AccountSource } from "../../../types";

export const useAccountImporter = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [source, setSource] = useState<AccountSource | null>(null);
  const [csvData, setCsvData] = useState<string | ArrayBuffer | null>(null);

  function onUploadFile(e: ChangeEvent<HTMLInputElement>) {
    setIsUploading(true);
    const file = e.target.files[0];

    const fileName = file.name;
    let fileSource = "";
    // get type from file name
    if (fileName.includes("icloud")) {
      fileSource = "icloud";
    } else if (fileName.includes("chrome")) {
      fileSource = "chrome";
    } else if (fileName.includes("firefox")) {
      fileSource = "firefox";
    }

    const from = fileSource as AccountSource;
    if (!from) {
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

  return {
    isUploading,
    csvData,
    source,
    onUploadFile,
  };
};
