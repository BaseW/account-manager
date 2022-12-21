import { Account } from '../../../types'
import { AccountCount } from '../../organisms/AccountCount/account-count.component'
import { useAccountFilterer } from './account-filterer.hooks'

export const AccountFilterer = ({ accounts, onToggleMode }: { accounts: Account[], onToggleMode: () => void }) => {
  const {
    accountMap,
    onChangeChromeCheckbox,
    onChangeIcloudCheckbox,
    onChangeFirefoxCheckbox,
    onFilterAccounts
  } = useAccountFilterer(accounts)

  return (
    <div>
      <div>
        <button onClick={() => onToggleMode()}>toggle mode</button>
      </div>
      <AccountCount accounts={accounts} />
      <div>
        <div className="filterConditions">
          <h3>Filter Conditions</h3>
          {/* checkbox for icloud */}
          <div>
            <input type="checkbox" onChange={onChangeIcloudCheckbox}/>
            <label>icloud</label>
          </div>
          {/* checkbox for chrome */}
          <div>
            <input type="checkbox" onChange={onChangeChromeCheckbox}/>
            <label>chrome</label>
          </div>
          {/* checkbox for firefox */}
          <div>
            <input type="checkbox" onChange={onChangeFirefoxCheckbox} />
            <label>firefox</label>
          </div>
        </div>
        <div className="filterButton">
          <button onClick={onFilterAccounts}>Filter</button>
        </div>
      </div>
      {/* print key count of accountMap */}
      <div>
        <h2>Count of Filtered Accounts</h2>
        {accountMap && Object.keys(accountMap).length}
      </div>
      {/* print url list and AccountPartial indented each url from accountMap */}
      <div>
        <h2>Filtered Accounts</h2>
        {accountMap && Object.keys(accountMap).map((url) => {
          return (
            <div key={url}>
              <p>{url}</p>
              <div>
                {accountMap[url].map((accountPartial) => {
                  return (
                    <div key={accountPartial.username}>
                      <p>{accountPartial.username}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
