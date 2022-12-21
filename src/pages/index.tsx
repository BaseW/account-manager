import { useCallback, useState } from "react";
import { Account, AccountMap, AccountSource } from "../types";
import { AccountImporter } from "../components/templates/AccountImporter/account-importer.component";
import { AccountFilterer } from "../components/templates/AccountFilterer/account-filterer.component";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [mode, setMode] = useState<'import' | 'filter'>('import');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountMap, setAccountMap] = useState<AccountMap>();

  const updateMode = useCallback((newMode: 'import' | 'filter') => {
    setMode(newMode);
  }, []);

  const updateAccounts = useCallback((newAccounts: Account[]) => {
    setAccounts(newAccounts)
  }, []);

  const updateAccountMap = useCallback((newAccountMap: AccountMap) => {
    setAccountMap(newAccountMap);
  }, []);

  function onFilterAccounts(isIcloudIncluded: boolean, isChromeIncluded: boolean, isFirefoxIncluded: boolean) {
    invoke("filter_accounts", { accounts, isIcloudIncluded, isChromeIncluded, isFirefoxIncluded }).then((res) => {
      const filteredAccountMap = res as AccountMap;
      updateAccountMap(filteredAccountMap);
    });
  }

  function startImport(csvData: string | ArrayBuffer | null, source: AccountSource) {
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

  return (
    <div className="container">
      {
        mode === 'import' ? 
          (<AccountImporter accounts={accounts} onToggleMode={() => updateMode('filter')} onImportAccounts={startImport} onResetAccounts={onResetAccounts} />)
          : (<AccountFilterer onToggleMode={() => updateMode('import')} accounts={accounts} accountMap={accountMap} onFilterAccounts={onFilterAccounts} />)
      }
    </div>
  );
}

export default App;
