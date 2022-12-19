import { Account } from '../../../types';
import { useAccountFilterer } from './account-filterer.hooks';

export const AccountFilterer = ({ accounts }: {accounts: Account[]}) => {
  const {
    accountMap,
    onChangeChromeCheckbox,
    onChangeIcloudCheckbox,
    onChangeFirefoxCheckbox,
    onFilterAccounts,
  } = useAccountFilterer(accounts);

  return (
    <div>
      <div>
        <div className="filterConditions">
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
      {/* print key count of accountMap*/}
      <div>
        {accountMap && Object.keys(accountMap).length}
      </div>
      {/* print url list and AccountPartial indented each url from accountMap*/}
      <div>
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
