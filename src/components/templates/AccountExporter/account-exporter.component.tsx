import { FilteredAccountCount } from "../../molecules/FilteredAccountCount/filtered-account-count.component";
import { AccountExporterProps } from "./account-exporter.types";

export const AccountExporter = ({
  accountMap,
  onToggleMode,
  exportAccounts,
}: AccountExporterProps): JSX.Element => (
  <div>
    <div>
      <button onClick={() => onToggleMode()}>toggle mode</button>
    </div>
    <FilteredAccountCount accountMap={accountMap} />
    <div>
      <h2>Export to csv</h2>
      <div>
        <button onClick={() => exportAccounts()}>Export Accounts</button>
      </div>
    </div>
  </div>
);
