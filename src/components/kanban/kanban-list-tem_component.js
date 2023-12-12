import React from "react";
import rasm from "../../assets/images/Layer_1 (4).png";

export default function KanbanListItemComponent() {
  return (
    <div className="kanban-list-item_component">
      <img src={rasm} alt="logo" />
      <h3>Yetkazib beruvchi</h3>
    </div>
  );
}
