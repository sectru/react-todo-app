import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [ updateModalOpen, setUpdateModalOpen ] = useState(false);
    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        if (todo.status === "complete") {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast.success("Item Deleted Successfully!");
    };

    const handleEdit = () => {
        setUpdateModalOpen(true);
    };

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete'
        }));
    }
    
    return (
        <>
            <div className={styles.item}>
                <div className={styles.todoDetails}>
                    <CheckButton 
                        checked={checked} 
                        handleCheck={handleCheck}
                    />
                    <div className={styles.text}>
                        <p 
                            className={getClasses([
                                styles.todoText, 
                                todo.status === 'complete' && styles["todoText--completed"]
                            ])}
                        >
                            {todo.title}
                        </p>
                        <p className={styles.time}>
                            {todo.time}
                        </p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div 
                        className={styles.icon}
                        onClick={handleDelete}
                        role="button"
                    >
                        <MdDelete />
                    </div>
                    <div 
                        className={styles.icon}
                        onClick={handleEdit}
                    >
                        <MdEdit />
                    </div>
                </div>
            </div>
            <TodoModal 
                type="edit" 
                modalOpen={updateModalOpen} 
                setModalOpen={setUpdateModalOpen}
                todo={todo}
            />
        </>
    )
}

export default TodoItem