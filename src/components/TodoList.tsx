import styled from "@emotion/styled";
import { Todo } from "../App";
import { useState } from "react";

type TodoItemProps = {
    item: Todo;
    index: number;
    onUpdate: (item: Todo, index: number) => void;
    onRemove: (index: number) => void;
};
const TodoItem = ({ item, index, onUpdate, onRemove }: TodoItemProps) => {
    const Item = styled.li`
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;

        width: 100%;
    `;

    const TodoCheck = styled.input`
        display: block;
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
        line-height: 1.4rem;
        background: rgb(0 0 0 / 0.003);
    `;

    const TodoRemove = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: none;
        font-size: 1.5rem;
        background: rgb(0 0 0 / 0.003);
    `;

    const TodoEdit = styled.input`
        flex-grow: 1;
        padding: 1rem;
        font-size: 1.5rem;
        line-height: 1.4rem;
        background: rgb(0 0 0 / 0.003);
        box-shadow: inset 0 -2px 1px rgb(0 0 0 / 0.03);
        border: none;
    `;

    const TodoLabel = styled.label`
        display: block;
        width: 100%;
        color: #484848;
        text-align: left;
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 1.4;
        padding: 1rem;
    `;

    const [label, setLabel] = useState(item.label);
    const [isCompleted, setIsCompleted] = useState(item.isCompleted);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value);
    };

    const handleFocusLoss = () => {
        toggleEditing();
        onUpdate({ ...item, label }, index);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            toggleEditing();
            onUpdate({ ...item, label }, index);
        }
    };

    const handleCheck = () => {
        setIsCompleted(!isCompleted);
        onUpdate({ ...item, isCompleted: !isCompleted }, index);
    };

    const handleButtonClick = () => {
        onRemove(index);
    };

    return (
        <Item>
            <TodoCheck
                type="checkbox"
                checked={isCompleted}
                onChange={handleCheck}
            ></TodoCheck>
            {isEditing ? (
                <TodoEdit
                    value={label}
                    onChange={handleValueChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleFocusLoss}
                    autoFocus
                ></TodoEdit>
            ) : (
                <TodoLabel
                    style={{
                        textDecoration: isCompleted ? "line-through" : "none",
                    }}
                    onDoubleClick={toggleEditing}
                >
                    {label}
                </TodoLabel>
            )}
            <TodoRemove onClick={handleButtonClick}>✕</TodoRemove>
        </Item>
    );
};

type TodoListProps = {
    items: Todo[];
    filter: "all" | "active" | "completed";
    onUpdateItem: (item: Todo, index: number) => void;
    onRemoveItem: (index: number) => void;
};
function TodoList({
    items,
    filter,
    onUpdateItem,
    onRemoveItem,
}: TodoListProps) {
    const List = styled.ul`
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        padding: 0;
    `;

    return (
        <List className="todo-list">
            {items.map((item, index) => {
                switch (filter) {
                    case "all":
                        return (
                            <TodoItem
                                key={index}
                                item={item}
                                index={index}
                                onUpdate={onUpdateItem}
                                onRemove={onRemoveItem}
                            ></TodoItem>
                        );

                    default:
                        return (
                            (filter === "active"
                                ? !item.isCompleted
                                : item.isCompleted) && (
                                <TodoItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    onUpdate={onUpdateItem}
                                    onRemove={onRemoveItem}
                                ></TodoItem>
                            )
                        );
                }
            })}
        </List>
    );
}

export default TodoList;
