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
        className={`header__button ${
          currentMode === "import" ? "header__button--active" : ""
        }`}
        onClick={() => onToggleMode("import")}
      >
        Import
      </button>
      <button
        className={`header__button ${
          currentMode === "filter" ? "header__button--active" : ""
        }`}
        onClick={() => onToggleMode("filter")}
      >
        Filter
      </button>
      <button
        className={`header__button ${
          currentMode === "export" ? "header__button--active" : ""
        }`}
        onClick={() => onToggleMode("export")}
      >
        Export
      </button>
    </div>
  );
};
