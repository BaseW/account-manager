import { FilteredAccountCount } from "../../molecules/FilteredAccountCount/filtered-account-count.component";
import { AccountCount } from "../../organisms/AccountCount/account-count.component";
import { useAccountFilterer } from "./account-filterer.hooks";
import { AccountFiltererProps } from "./account-filterer.types";

export const AccountFilterer = ({
  accounts,
  accountMap,
  onFilterAccounts
}: AccountFiltererProps): JSX.Element => {
  const {
    isIcloudIncluded,
    isChromeIncluded,
    isFirefoxIncluded,
    onChangeChromeCheckbox,
    onChangeIcloudCheckbox,
    onChangeFirefoxCheckbox,
    onFilterAccountsCallback
  } = useAccountFilterer(onFilterAccounts);

  return (
    <div>
      <AccountCount accounts={accounts} />
      <div>
        <div className="filterConditions">
          <h3>Filter Conditions</h3>
          {/* checkbox for icloud */}
          <div>
            <input
              type="checkbox"
              checked={isIcloudIncluded}
              onChange={onChangeIcloudCheckbox}
            />
            <label>icloud</label>
          </div>
          {/* checkbox for chrome */}
          <div>
            <input
              type="checkbox"
              checked={isChromeIncluded}
              onChange={onChangeChromeCheckbox}
            />
            <label>chrome</label>
          </div>
          {/* checkbox for firefox */}
          <div>
            <input
              type="checkbox"
              checked={isFirefoxIncluded}
              onChange={onChangeFirefoxCheckbox}
            />
            <label>firefox</label>
          </div>
        </div>
        <div className="filterButton">
          <button onClick={onFilterAccountsCallback}>Filter</button>
        </div>
      </div>
      {/* print key count of accountMap */}
      <FilteredAccountCount accountMap={accountMap} />
    </div>
  );
};
