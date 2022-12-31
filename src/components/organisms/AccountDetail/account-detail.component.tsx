import { AccountDetailProps } from "./account-detail.types";

export const AccountDetail = ({ account }: AccountDetailProps): JSX.Element => (
  <div className="accountDetailContainer">
    <div className="accountUrlContainer" title={account.url}>
      {account.url}
    </div>
    <div className="accountSourceContainer">{account.source}</div>
  </div>
);
