import React from "react";
import KanbanColumnComponent from "./kanban-column_component";

export default function KanbanColumnContainer({ children, columnId, onDrop }) {
  
  const handleDragOver = event => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move";
  }

  const handleDrop = event => {
    event.preventDefault();
    const rowData = JSON.parse(event.dataTransfer.getData("text/plain"));
    onDrop(columnId, rowData);
    console.log('rowDATA', rowData);
  };

  return (
    <div className="kanban-column_container" onDragOver={handleDragOver} onDrop={handleDrop}  >
      <KanbanColumnComponent >{children}</KanbanColumnComponent>
    </div>
  );
}
