import { FilteredAccountCount } from "../../molecules/FilteredAccountCount/filtered-account-count.component";
import { AccountCount } from "../../organisms/AccountCount/account-count.component";
import { useAccountFilterer } from "./account-filterer.hooks";
import { AccountFiltererProps } from "./account-filterer.types";

export const AccountFilterer = ({
  accounts,
  accountMap,
  onToggleMode,
  onFilterAccounts,
}: AccountFiltererProps): JSX.Element => {
  const {
    onChangeChromeCheckbox,
    onChangeIcloudCheckbox,
    onChangeFirefoxCheckbox,
    onFilterAccountsCallback,
  } = useAccountFilterer(onFilterAccounts);

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
            <input type="checkbox" onChange={onChangeIcloudCheckbox} />
            <label>icloud</label>
          </div>
          {/* checkbox for chrome */}
          <div>
            <input type="checkbox" onChange={onChangeChromeCheckbox} />
            <label>chrome</label>
          </div>
          {/* checkbox for firefox */}
          <div>
            <input type="checkbox" onChange={onChangeFirefoxCheckbox} />
            <label>firefox</label>
          </div>
        </div>
        <div className="filterButton">
          <button onClick={onFilterAccountsCallback}>Filter</button>
        </div>
      </div>
      {/* print key count of accountMap */}
      <FilteredAccountCount accountMap={accountMap} />
      {/* print url list and AccountPartial indented each url from accountMap */}
      <div>
        <h2>Filtered Accounts</h2>
        {accountMap !== undefined &&
          Object.keys(accountMap).length > 0 &&
          Object.keys(accountMap).map((url) => {
            return (
              <div key={url}>
                <p>{url}</p>
                <div>
                  {accountMap[url].map((accountPartial) => {
                    return (
                      <div key={accountPartial.username}>
                        <p>{accountPartial.username}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
