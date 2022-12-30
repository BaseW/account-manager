import { AccountMap } from "../../../types";

export const FilteredAccountCount = ({
  accountMap
}: {
  accountMap: AccountMap | null;
}): JSX.Element => (
  <div>
    <h2>Count of Filtered Accounts</h2>
    {accountMap !== null && Object.keys(accountMap).length}
    {accountMap === null && 0}
  </div>
);
