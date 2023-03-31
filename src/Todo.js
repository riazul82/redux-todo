import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, fetchTodos } from './reducers/todoReducer';

const Todo = () => {
    const [todoText, setTodoText] = useState('');
    const [updateStatus, setUpdateStatus] = useState({data: null, flag: false});
    const { todos } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleChange = (e) => {
        setTodoText(e.target.value);
    }

    const handleCheckbox = (id, e) => {
        for (let todo of todos) {
            if (todo.id === id) {
                dispatch(updateTodo({...todo, completed: e.target.checked}));
                break;
            }
        }
    }

    const handleUpdate = (todo) => {
        if (updateStatus.flag && updateStatus.data.id === todo.id) {
            // if todo app is already on update mode, then reset (cancel edit)
            setTodoText('');
            setUpdateStatus({data: null, flag: false});
        } else {
            // otherwise execute this block
            setTodoText(todo.title);
            setUpdateStatus({data: todo, flag: true});
        }
    }

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));

        // if todo app is on update mode, then reset
        setTodoText('');
        setUpdateStatus({data: null, flag: false});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // if input field empty, then return
        if (!todoText) return;

        if (updateStatus.flag) {
            // if todo app is on update mode, then execute this block
            dispatch(updateTodo({...updateStatus.data, title: todoText}));
            setUpdateStatus({data: null, flag: false});
        } else {
            // otherwise execute this block
            dispatch(addTodo({id: Date.now(), title: todoText, completed: false}));
        }
        setTodoText('');
    }

    return (
        <div className="w-[700px] mx-auto">
            <h1 className="text-[24px] font-bold">Todo List</h1>
            <form onSubmit={handleSubmit} className="mt-4 w-full h-[40px] flex items-center justify-center rounded-full bg-white">
                <input className="w-[70%] h-full text-[16px] outline-none border-none px-4 box-border bg-transparent text-[#222] focus:ring-0" value={todoText} onChange={handleChange} type="text" placeholder="Type your text here..." />
                <button className="w-[30%] h-full text-[16px] text-[#fff] bg-slate-700 rounded-full border-4 border-[#fff]" type="submit">{updateStatus.flag ? 'Update Todo' : 'Add Todo'}</button>
            </form>
            <ul className="flex flex-col-reverse w-full h-auto mt-4">
                {
                    todos && todos.map((elem) => {
                        return <li key={elem.id} className="flex items-center justify-between w-full h-auto rounded-full my-2">
                            <div className="flex items-center py-1 w-[78%]">
                                <input id={`default-${elem.id}`} type="checkbox" onChange={(e) => handleCheckbox(elem.id, e)} value="" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-0 focus:ring-offset-0" />
                                <label htmlFor={`default-${elem.id}`} className="ml-2 text-[16px] font-medium">{elem.completed ? <del className="text-gray-500">{elem.title}</del> : <span>{elem.title}</span>}</label>
                            </div>
                            <div className="flex w-[22%] items-center justify-end">
                                <button className="py-1 px-4 mr-2 bg-gray-700 rounded-full" onClick={() => handleUpdate(elem)}>{(updateStatus.flag && elem.id === updateStatus.data.id) ? 'cancel' : 'edit'}</button>
                                <button className="py-1 px-4 bg-red-500 rounded-full" onClick={() => handleDelete(elem.id)}>delete</button>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default Todo;