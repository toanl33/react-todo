import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { z } from "zod";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const Header = styled.header`
    color: #b83f45;
    font-size: 80px;
    font-weight: 200;
`;

type FooterProps = {
    count: number;
    filter: "all" | "active" | "completed";
    onShowAll: () => void;
    onShowActive: () => void;
    onShowCompleted: () => void;
    onClearCompleted: () => void;
};
const Footer = ({
    count,
    filter,
    onShowAll,
    onShowActive,
    onShowCompleted,
    onClearCompleted,
}: FooterProps) => {
    const Container = styled.footer`
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 480px;
        gap: 2rem;
    `;

    const Counter = styled.div`
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0.25rem 0.5rem;
    `;

    const Filters = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const Button = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.25rem;
        border: none;
        background: rgb(0 0 0 / 0.003);
        &.active {
            font-weight: bold;
        }
    `;

    return (
        <Container>
            <Counter>{count} items left!</Counter>
            <Filters>
                <Button
                    className={filter === "all" ? "active" : undefined}
                    onClick={onShowAll}
                >
                    All
                </Button>
                <Button
                    className={filter === "active" ? "active" : undefined}
                    onClick={onShowActive}
                >
                    Active
                </Button>
                <Button
                    className={filter === "completed" ? "active" : undefined}
                    onClick={onShowCompleted}
                >
                    Completed
                </Button>
            </Filters>
            <Button onClick={onClearCompleted}>Clear completed</Button>
        </Container>
    );
};

const todoSchema = z.object({
    label: z.string(),
    isCompleted: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;

function App() {
    const [todos, setTodos] = useState<Todo[]>(
        JSON.parse(localStorage.getItem("todos") || "[]")
    );
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    const addTodo = (e: Todo) => {
        setTodos([...todos, e]);
    };

    const updateTodo = (updatedItem: Todo, updatedIndex: number) => {
        const updatedList = todos.map((item, index) =>
            index === updatedIndex ? updatedItem : item
        );
        setTodos(updatedList);
    };

    const removeTodo = (removedIndex: number) => {
        const updatedList = todos.filter((_, index) => index !== removedIndex);
        setTodos(updatedList);
    };

    const checkAllTodo = (e: boolean) => {
        const updatedList = todos.map((item) => ({ ...item, isCompleted: e }));
        setTodos(updatedList);
    };

    const clearCompleted = () => {
        const updatedList = todos.filter((item) => !item.isCompleted);
        setTodos(updatedList);
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <>
            <main>
                <Header>todos</Header>
                <div>
                    <TodoForm
                        onAdd={addTodo}
                        onCheckAll={checkAllTodo}
                    ></TodoForm>
                    <TodoList
                        items={todos}
                        filter={filter}
                        onUpdateItem={updateTodo}
                        onRemoveItem={removeTodo}
                    ></TodoList>
                </div>
                <Footer
                    count={todos.filter((todo) => !todo.isCompleted).length}
                    filter={filter}
                    onShowAll={() => setFilter("all")}
                    onShowActive={() => setFilter("active")}
                    onShowCompleted={() => setFilter("completed")}
                    onClearCompleted={clearCompleted}
                ></Footer>
            </main>
        </>
    );
}

export default App;
