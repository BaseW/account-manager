import { ChangeEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";

type Account = {
  url: string;
  username: string;
  from: 'icloud' | 'chrome' | 'firefox'
}

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [fileFrom, setFileFrom] = useState(''); // ['icloud', 'chrome', 'firefox'
  const [csvData, setCsvData] = useState<string | ArrayBuffer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

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

    setFileFrom(from);

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
    invoke("import_accounts", { csvData, from: fileFrom }).then((res) => {
      const newlyImportedAccounts = res as Account[];
      const concatenedAccounts = [...accounts, ...newlyImportedAccounts];
      setAccounts(concatenedAccounts);
    });
  }

  function onResetAccounts() {
    setAccounts([]);
  }

  return (
    <div className="container">
      <div>
        <p>Please drop csv</p>
        <input type="file" onChange={(e) => onUploadFile(e)} />
      </div>
      <div>
        <button disabled={isUploading || csvData === null} onClick={() => startImport()}>Import accounts</button>
      </div>
      <div>
        <button onClick={() => onResetAccounts()}>reset accounts</button>
      </div>
      <div>
        <p>Accounts</p>
        <ul>
          {accounts.map((account) => (
            <li key={account.url + account.username}>
              {account.url} - {account.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
