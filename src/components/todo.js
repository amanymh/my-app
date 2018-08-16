import React from "react";

const Todo = props => {
  const { work, doneToggle, edit, deleteTodo, index } = props;

  return (
    <div>
      <li id="inputli" key="index">
        <span>
          <input
            type="checkbox"
            checked={work.done}
            onChange={() => doneToggle(work)}
            style={{ fontSize: "x-large" }}
          />
          <span
            onClick={() => doneToggle(work)}
            className={work.done ? "done" : ""}
            id="todoText"
          >
            {work.value}
            <span
              className={
                work.category === "work"
                  ? "blueTag"
                  : work.category === "sport"
                    ? "yellowTag"
                    : "greenTag"
              }
            >
              {work.category}
            </span>
          </span>
        </span>
        <span>
          <input
            className="removeTodo"
            type="button"
            value="Edit"
            onClick={() => edit(work)}
            data-key={index}
          />
          {work.done && (
            <input
              className="removeTodo"
              type="button"
              value="x"
              onClick={deleteTodo}
              data-key={index}
            />
          )}
        </span>
      </li>
    </div>
  );
};

export default Todo;
