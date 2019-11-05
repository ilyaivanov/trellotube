import React, { useState } from "react";
import { renameColumn, removeColumn } from "./actions";
import { Title, Options } from "./components";
import { connect } from "react-redux";
interface Props {
  dragHandleProps: {} | null;
  label: string;
  columnId: string;
  renameColumn: (columnId: string, newLabel: string) => void;
  removeColumn: (columnId: string) => void;
}
const ColumnTitle = ({
  columnId,
  label,
  renameColumn,
  removeColumn,
  dragHandleProps
}: Props) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newText, setNewText] = useState(label);

  const onEditButtonPress = () => {
    if (isRenaming) {
      renameColumn(columnId, newText);
    }
    setIsRenaming(!isRenaming);
  };

  return (
    <Title {...dragHandleProps}>
      {isRenaming ? (
        <input
          autoFocus
          type="text"
          value={newText}
          data-testid={"column-label-input-" + columnId}
          onChange={e => setNewText(e.target.value)}
        />
      ) : (
        label
      )}{" "}
      <Options>
        <button
          data-testid={"column-rename-" + columnId}
          onClick={onEditButtonPress}
        >
          E
        </button>
        <button
          data-testid={"column-remove-" + columnId}
          onClick={() => removeColumn(columnId)}
        >
          X
        </button>
      </Options>
    </Title>
  );
};

export default connect(
  null,
  { renameColumn, removeColumn }
)(ColumnTitle);
