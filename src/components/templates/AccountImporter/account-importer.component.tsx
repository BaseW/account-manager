import { Account } from '../../../types'
import { AccountCount } from '../../organisms/AccountCount/account-count.component'
import { useAccountImporter } from './account-importer.hooks'

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
  } = useAccountImporter(accounts, updateAccounts)

  return (
    <div>
      <div>
        <button onClick={() => onToggleMode()}>toggle mode</button>
      </div>
      <AccountCount accounts={accounts} />
      <div>
        <h2>Import from csv</h2>
        <div>
          <input type="file" onChange={(e) => onUploadFile(e)} />
        </div>
        <div>
          <button disabled={isUploading || csvData === null} onClick={() => startImport()}>Import accounts</button>
        </div>
        <div>
          <button onClick={() => onResetAccounts()}>reset accounts</button>
        </div>
      </div>
    </div>
  )
}
