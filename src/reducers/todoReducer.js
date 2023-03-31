import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        return await res.json();
    } catch(error) {
        console.log(error);
    }
});

const todoReducer = createSlice({
    name: 'todos',
    initialState: { todos: JSON.parse(localStorage.getItem('todos')) || [], loading: false, error: '' },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        updateTodo: (state, action) => {
            let newTodos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return action.payload;
                }
                return todo;
            });
            state.todos = [...newTodos];
            localStorage.setItem('todos', JSON.stringify(newTodos));
        },
        deleteTodo: (state, action) => {
            let newTodos = state.todos.filter((todo) => {
                if (todo.id === action.payload) {
                    return null;
                }
                return todo;
            });
            state.todos = [...newTodos];
            localStorage.setItem('todos', JSON.stringify(newTodos));
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchTodos.pending, (state, action) => {
              state.loading = true;
          })
          .addCase(fetchTodos.fulfilled, (state, action) => {
              state.loading = false;
              if (localStorage.getItem('todos') === null) {
                  const todos = action.payload.slice(0, 10).map((todo) => {return {...todo, completed: false}});
                  state.todos = [...todos];
                  localStorage.setItem('todos', JSON.stringify(state.todos));
              } 
          })
          .addCase(fetchTodos.rejected, (state, action) => {
              state.error = action.error.message;
          })
    }
});

export const { addTodo, updateTodo, deleteTodo } = todoReducer.actions;
export default todoReducer.reducer;