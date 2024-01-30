import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Todo } from "../App";

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-width: 480px;
    gap: 0;
`;

const InputText = styled.input`
    flex-grow: 1;
    padding: 1rem;
    font-size: 1.5rem;
    font-style: italic;
    line-height: 1.4rem;
    background: rgb(0 0 0 / 0.003);
    box-shadow: inset 0 -2px 1px rgb(0 0 0 / 0.03);
    border: none;
`;

const InputCheckbox = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
`;

const Label = styled.label`
    &:before {
        content: "✓";
        display: block;
        font-size: 1.5rem;
        background: rgb(0 0 0 / 0.003);
    }
`;

type TodoFormProps = {
    onAdd: (e: Todo) => void;
    onCheckAll: (e: boolean) => void;
};
function TodoForm({ onAdd: onAddNew, onCheckAll }: TodoFormProps) {
    const [value, setValue] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleChecked = () => {
        setIsChecked(!isChecked);
        onCheckAll(!isChecked);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onAddNew({ isCompleted: false, label: value });
    };

    useEffect(() => {
        onCheckAll(isChecked);
    }, [isChecked]);

    return (
        <Form>
            <Label htmlFor="todo-check-all">
                <InputCheckbox
                    id="todo-check-all"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChecked}
                ></InputCheckbox>
            </Label>
            <InputText
                id="todo-add-new"
                type="text"
                placeholder="What needs to be done?"
                value={value}
                onChange={handleValueChange}
                onKeyDown={handleKeyDown}
            ></InputText>
        </Form>
    );
}

export default TodoForm;
