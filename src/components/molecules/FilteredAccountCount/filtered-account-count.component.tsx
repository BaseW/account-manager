import { AccountMap } from "../../../types";

export const FilteredAccountCount = (accountMap: AccountMap) => (
  <div>
    <h2>Count of Filtered Accounts</h2>
    {accountMap && Object.keys(accountMap).length}
  </div>
)
