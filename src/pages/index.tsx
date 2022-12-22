import { useCallback, useState } from "react";
import { Account, AccountMap, AccountSource } from "../types";
import { AccountImporter } from "../components/templates/AccountImporter/account-importer.component";
import { AccountFilterer } from "../components/templates/AccountFilterer/account-filterer.component";
import { invoke } from "@tauri-apps/api/tauri";
import { Header } from "../components/molecules/Header/header.component";
import { PageMode } from "../types/page-mode";
import { AccountExporter } from "../components/templates/AccountExporter/account-exporter.component";

function App(): JSX.Element {
  const [mode, setMode] = useState<PageMode>("import");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountMap, setAccountMap] = useState<AccountMap>();

  const updateMode = useCallback((newMode: PageMode) => {
    setMode(newMode);
  }, []);

  const updateAccounts = useCallback((newAccounts: Account[]) => {
    setAccounts(newAccounts);
  }, []);

  const updateAccountMap = useCallback((newAccountMap: AccountMap) => {
    setAccountMap(newAccountMap);
  }, []);

  function onFilterAccounts(
    isIcloudIncluded: boolean,
    isChromeIncluded: boolean,
    isFirefoxIncluded: boolean
  ): void {
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
  }

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

  const exportAccounts = useCallback(() => {}, []);

  return (
    <div className="container">
      <Header currentMode={mode} onToggleMode={updateMode} />
      {mode === "import" && (
        <AccountImporter
          accounts={accounts}
          onImportAccounts={startImport}
          onResetAccounts={onResetAccounts}
        />
      )}
      {mode === "filter" && (
        <AccountFilterer
          accounts={accounts}
          accountMap={accountMap}
          onFilterAccounts={onFilterAccounts}
        />
      )}
      {mode === "export" && (
        <AccountExporter
          accountMap={accountMap}
          onExportAccounts={exportAccounts}
        />
      )}
    </div>
  );
}

export default App;
