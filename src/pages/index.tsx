import { useCallback, useState } from 'react'
import { Account } from '../types'
import { AccountImporter } from '../components/templates/AccountImporter/account-importer.component'
import { AccountFilterer } from '../components/templates/AccountFilterer/account-filterer.component'

function App () {
  const [mode, setMode] = useState<'import' | 'filter'>('import')
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isIcloudIncluded, setIsIcloudIncluded] = useState(true)
  const [isChromeIncluded, setIsChromeIncluded] = useState(true)
  const [isFirefoxIncluded, setIsFirefoxIncluded] = useState(true)
  const [accountMap, setAccountMap] = useState<AccountMap>()

  const updateMode = useCallback((newMode: 'import' | 'filter') => {
    setMode(newMode)
  }, [])

  const updateAccounts = useCallback((newAccounts: Account[]) => {
    setAccounts(newAccounts)
  }, [])

  function onChangeIcloudCheckbox (e: ChangeEvent<HTMLInputElement>) {
    setIsIcloudIncluded(e.target.checked)
  }

  function onChangeChromeCheckbox (e: ChangeEvent<HTMLInputElement>) {
    setIsChromeIncluded(e.target.checked)
  }

  function onChangeFirefoxCheckbox (e: ChangeEvent<HTMLInputElement>) {
    setIsFirefoxIncluded(e.target.checked)
  }

  function onFilterAccounts () {
    invoke('filter_accounts', { accounts, isIcloudIncluded, isChromeIncluded, isFirefoxIncluded }).then((res) => {
      const filteredAccountMap = res as AccountMap
      setAccountMap(filteredAccountMap)
    })
  }

  return (
    <div className="container">
      {
        mode === 'import'
          ? (<AccountImporter accounts={accounts} onToggleMode={() => updateMode('filter')} updateAccounts={updateAccounts} />)
          : (<AccountFilterer onToggleMode={() => updateMode('import')} accounts={accounts} />)
      }
    </div>
  )
}

export default App
