import { AccountExporterProps } from "./account-exporter.types";

export const AccountExporter = ({
  onToggleMode,
  exportAccounts
}: AccountExporterProps) => (
  <div>
    <div>
      <button onClick={() => onToggleMode()}>toggle mode</button>
    </div>
    <div>
      <h2>Export to csv</h2>
      <div>
        <button onClick={() => exportAccounts()}>Export Accounts</button>
      </div>
    </div>
  </div>
)
