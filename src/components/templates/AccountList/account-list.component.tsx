import { AccountDetail } from "../../organisms/AccountDetail/account-detail.component";
import { AccountListProps } from "./account-list.types";

export const AccountList = ({ accounts }: AccountListProps): JSX.Element => (
  <div>
    <h2>Account List</h2>
    <div>
      {accounts.map((account) => (
        <AccountDetail key={account.url + account.source} account={account} />
      ))}
    </div>
  </div>
);
