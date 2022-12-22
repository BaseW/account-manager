import { FilteredAccountCount } from "../../molecules/FilteredAccountCount/filtered-account-count.component";
import { AccountExporterProps } from "./account-exporter.types";

export const AccountExporter = ({
  accountMap,
  onExportAccounts
}: AccountExporterProps): JSX.Element => (
  <div>
    <FilteredAccountCount accountMap={accountMap} />
    <div>
      <h2>Export to csv</h2>
      <div>
        <button onClick={() => onExportAccounts()}>Export Accounts</button>
      </div>
    </div>
  </div>
);
