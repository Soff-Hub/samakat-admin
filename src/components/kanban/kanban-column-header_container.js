import React from 'react'

export default function KanbanColumnHeaderContainer({title}) {
  return (
    <div className='kanban-column-header_container' >
     <i class="fa-solid fa-chart-simple"></i>
      <h3>{title}</h3>
    </div>
  )
}
