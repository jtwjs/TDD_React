import React, { memo } from "react";

const Habit = memo(({ habit, onIncrement, onDecrement, onDelete }) => {
  const handleIncrement = () => {
    onIncrement(habit);
  };

  const handleDecrement = () => {
    if (!habit.count) return;
    onDecrement(habit);
  };

  const handleDelete = () => {
    onDelete(habit);
  };

  return (
    <li className="habit">
      <span className="habit-name" data-testid="name">
        {habit.name}
      </span>
      <span className="habit-count" data-testid="count">
        {habit.count}
      </span>
      <button
        className="habit-button habit-increase"
        aria-label="increase"
        onClick={handleIncrement}
      >
        <i className="fas fa-plus-square"></i>
      </button>
      <button
        className="habit-button habit-decrease"
        aria-label="decrease"
        onClick={handleDecrement}
      >
        <i className="fas fa-minus-square"></i>
      </button>
      <button
        className="habit-button habit-delete"
        aria-label="delete"
        onClick={handleDelete}
      >
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
});

export default Habit;
