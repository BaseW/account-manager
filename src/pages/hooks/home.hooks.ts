import { useState, useCallback } from "react";
import { PageMode, Account, AccountMap } from "../../types/";
import { HomeState } from "./home.types";
import { useImport } from "./useImport";
import { useFilter } from "./useFilter";
import { useExport } from "./useExport";

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
  const { exportAccounts } = useExport({ accountMap });

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
