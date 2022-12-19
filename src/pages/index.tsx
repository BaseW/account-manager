import { useCallback, useState } from "react";
import { Account } from "../types";
import { AccountImporter } from "../components/templates/AccountImporter/account-importer.component";
import { AccountFilterer } from "../components/templates/AccountFilterer/account-filterer.component";

function App() {
  const [mode, setMode] = useState<'import' | 'filter'>('import');
  const [accounts, setAccounts] = useState<Account[]>([]);

  const updateAccounts = useCallback((newAccounts: Account[]) => {
    setAccounts(newAccounts)
  }, []);

  return (
    <div className="container">
      {
        mode === 'import' ? (<AccountImporter accounts={accounts} updateAccounts={updateAccounts} />) : (<AccountFilterer accounts={accounts} />)
      }
    </div>
  );
}

export default App;
