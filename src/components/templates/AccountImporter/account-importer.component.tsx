import { Account } from "../../../types";
import { useAccountImporter } from "./account-importer.hooks"

export const AccountImporter = ({
  accounts,
  onToggleMode,
  updateAccounts
}: {
  accounts: Account[], onToggleMode: () => void; updateAccounts: (accounts: Account[]) => void
}) => {
  const {
    isUploading,
    csvData,
    onUploadFile,
    startImport,
    onResetAccounts
  } = useAccountImporter(accounts, updateAccounts);

  return (
    <div>
      <div>
        <button onClick={() => onToggleMode()}>toggle mode</button>
      </div>
      <div>
        <p>Please choose csv</p>
        <input type="file" onChange={(e) => onUploadFile(e)} />
      </div>
      <div>
        <button disabled={isUploading || csvData === null} onClick={() => startImport()}>Import accounts</button>
      </div>
      <div>
        <button onClick={() => onResetAccounts()}>reset accounts</button>
      </div>
      {/* print account count for each source */}
      <div>
        <p>icloud: {accounts.filter((account) => account.source === 'icloud').length}</p>
        <p>chrome: {accounts.filter((account) => account.source === 'chrome').length}</p>
        <p>firefox: {accounts.filter((account) => account.source === 'firefox').length}</p>
      </div>
    </div>
  )
}
