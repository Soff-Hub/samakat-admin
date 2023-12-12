import React from 'react'
import KanbanListItemComponent from './kanban-list-tem_component'

export default function KanbanListItemContainer({ rowId, oldColumnId }) {

  const handleDragStart = event => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ rowId, oldColumnId }));
    // console.log('item');
  };


  return (
    <div className='kanban-list-item_container' draggable onDragStart={handleDragStart} >
       <KanbanListItemComponent/>
    </div>
  )
}
