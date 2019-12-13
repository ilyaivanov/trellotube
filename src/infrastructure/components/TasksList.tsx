import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ItemViewModel } from "../../state2/boards";
import Card from "./Card";

const TasksList = ({
  droppableId,
  tasks
}: {
  tasks: ItemViewModel[];
  droppableId: string;
}) => (
  <Droppable droppableId={droppableId} type="item">
    {provided => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {tasks.map((i, index) => (
          <Card key={i.id} index={index} item={i} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default TasksList;
