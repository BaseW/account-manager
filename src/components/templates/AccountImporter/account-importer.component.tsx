import { AccountCount } from "../../organisms/AccountCount/account-count.component";
import { useAccountImporter } from "./account-importer.hooks";
import { AccountImporterProps } from "./account-importer.types";

export const AccountImporter = ({
  accounts,
  onImportAccounts,
  onResetAccounts
}: AccountImporterProps): JSX.Element => {
  const { isUploading, csvData, source, onUploadFile } = useAccountImporter();

  return (
    <div>
      <AccountCount accounts={accounts} />
      <div>
        <h2>Import from csv</h2>
        <div>
          <input type="file" onChange={(e) => onUploadFile(e)} />
        </div>
        <div>
          <button
            disabled={isUploading || csvData === null}
            onClick={() => onImportAccounts(csvData, source)}
          >
            Import accounts
          </button>
        </div>
        <div>
          <button onClick={() => onResetAccounts()}>reset accounts</button>
        </div>
      </div>
    </div>
  );
};
