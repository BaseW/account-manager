import { PageMode } from "../../../types/page-mode";

export const Header = ({
  currentMode,
  onToggleMode
}: {
  currentMode: PageMode;
  onToggleMode: (mode: PageMode) => void;
}): JSX.Element => {
  // switch three states: import, filter, export
  // this component has three buttons

  return (
    <div className="header">
      <button
        className={`headerButton ${
          currentMode === "import" ? "headerButtonActive" : ""
        }`}
        onClick={() => onToggleMode("import")}
      >
        Import
      </button>
      <button
        className={`headerButton ${
          currentMode === "list" ? "headerButtonActive" : ""
        }`}
        onClick={() => onToggleMode("list")}
      >
        List
      </button>
      <button
        className={`headerButton ${
          currentMode === "filter" ? "headerButtonActive" : ""
        }`}
        onClick={() => onToggleMode("filter")}
      >
        Filter
      </button>
      <button
        className={`headerButton ${
          currentMode === "export" ? "headerButtonActive" : ""
        }`}
        onClick={() => onToggleMode("export")}
      >
        Export
      </button>
    </div>
  );
};
