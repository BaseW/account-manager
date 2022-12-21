import { AccountMap } from "../../../types";

export const FilteredAccountCount = (accountMap: AccountMap): JSX.Element => (
  <div>
    <h2>Count of Filtered Accounts</h2>
    {Object.keys(accountMap).length > 0 && Object.keys(accountMap).length}
  </div>
);
