import { Account } from "../../../types";

export const AccountCount = ({accounts}: {accounts: Account[]}) => (
  <div>
    <p>icloud: {accounts.filter((account) => account.source === 'icloud').length}</p>
    <p>chrome: {accounts.filter((account) => account.source === 'chrome').length}</p>
    <p>firefox: {accounts.filter((account) => account.source === 'firefox').length}</p>
  </div>
)
