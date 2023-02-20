import React, { useState, useEffect } from 'react'
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { v4 as uuid } from "uuid";
import toast from 'react-hot-toast';

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
    const [ title, setTitle ] = useState("");
    const [ status, setStatus ] = useState('incomplete');
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'edit' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        }
    }, [type, todo, modalOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && status) {
            if(type === "add") {
                dispatch(addTodo({
                    id: uuid(),
                    title,
                    status,
                    time: new Date().toLocaleString()
                }));
                toast.success("Task Added Successfully!"); 
                setModalOpen(false);
                setTitle("");
            } else {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({
                        ...todo,
                        title,
                        status
                    }));
                    toast.success("Task Edited Successfully!"); 
                    setModalOpen(false);
                } else {
                    toast.error("No Changes Made");
                }
            }
        } else {
            toast.error("Title shouldn't be empty");
        }
    }

    return (
        modalOpen && (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.closeButton} 
                        onClick={() => setModalOpen(false)}
                        onKeyDown={() => setModalOpen(false)}
                        tabIndex={0}
                        role="button"
                    >
                        <MdOutlineClose />
                    </div>
                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                        <h1 className={styles.formTitle}>
                            {type === 'edit' ? "Edit" : "Add"} Task</h1>
                        <label htmlFor="title">
                            Title
                            <input 
                                type="text" 
                                id="title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label htmlFor="status">
                            Status
                            <select 
                                name="status" 
                                id="status" 
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Complete</option>
                            </select>
                        </label>
                        <div className={styles.buttonContainer}>
                            <Button type="submit" variant="primary">
                                {type === "edit" ? "Edit" : "Add"} Task
                            </Button>
                            <Button 
                                type="button"
                                variant="secondary"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default TodoModal