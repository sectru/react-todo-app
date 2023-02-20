import { createSlice } from "@reduxjs/toolkit";

const getInitialTodos = () => {
    const localTodoList = window.localStorage.getItem('todoList');
    if (JSON.parse(localTodoList)) {
        return JSON.parse(localTodoList);
    } else {
        window.localStorage.setItem('todoList', JSON.stringify([]));
        return [];
    }
}

const initialValue = {
    filterStatus: 'all',
    todoList: getInitialTodos()
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({...action.payload});
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
            }
        },
        deleteTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList).filter(todo => 
                    todo.id !== action.payload
                )
                window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem("todoList");
            if (JSON.parse(todoList)) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach(todo => {
                    if (todo.id === action.payload.id) {
                        todo.title = action.payload.title;
                        todo.status = action.payload.status;
                    }
                });
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        }
    }
});

export default todoSlice.reducer;

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } = todoSlice.actions;