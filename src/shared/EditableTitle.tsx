import React, { useState } from "react";
interface Props {
  dragHandleProps: {} | null;
  label: string;
  id: string;
  testIdGroupName: string;
  onRename: (columnId: string, newLabel: string) => void;
  onRemove: (columnId: string) => void;
  Title: any;
  Options: any;
}
const EditableTitle = ({
  id,
  label,
  onRename,
  onRemove,
  dragHandleProps,
  testIdGroupName,
  Title,
  Options
}: Props) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newText, setNewText] = useState(label);

  const onEditButtonPress = (e: any) => {
    e.stopPropagation();
    if (isRenaming) {
      onRename(id, newText);
    }
    setIsRenaming(!isRenaming);
  };

  const onRemoveClick = (e: any) => {
    e.stopPropagation();
    onRemove(id);
  };

  return (
    <Title {...dragHandleProps} data-testid={`${testIdGroupName}-` + id}>
      {isRenaming ? (
        <input
          autoFocus
          type="text"
          value={newText}
          data-testid={`${testIdGroupName}-input-` + id}
          onChange={e => setNewText(e.target.value)}
        />
      ) : (
        <div data-testid={`${testIdGroupName}-title-` + id}>{label}</div>
      )}
      <Options>
        <button
          data-testid={`${testIdGroupName}-rename-` + id}
          onClick={onEditButtonPress}
        >
          E
        </button>
        <button
          data-testid={`${testIdGroupName}-remove-` + id}
          onClick={onRemoveClick}
        >
          X
        </button>
      </Options>
    </Title>
  );
};

export default EditableTitle;
