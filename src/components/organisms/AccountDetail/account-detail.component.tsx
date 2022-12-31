import { AccountDetailProps } from "./account-detail.types";

export const AccountDetail = ({ account }: AccountDetailProps): JSX.Element => (
  <div>
    <h5>{account.url}</h5>
    <p>{account.source}</p>
  </div>
);
