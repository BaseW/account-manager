import { AccountImporter } from "../components/templates/AccountImporter/account-importer.component";
import { AccountFilterer } from "../components/templates/AccountFilterer/account-filterer.component";
import { Header } from "../components/molecules/Header/header.component";
import { AccountExporter } from "../components/templates/AccountExporter/account-exporter.component";
import { useHome } from "./hooks";
import { AccountList } from "../components/templates/AccountList/account-list.component";

function App(): JSX.Element {
  const {
    mode,
    accounts,
    accountMap,
    updateMode,
    startImport,
    onResetAccounts,
    onFilterAccounts,
    exportAccounts
  } = useHome();

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
      {mode === "list" && <AccountList accounts={accounts} />}
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
