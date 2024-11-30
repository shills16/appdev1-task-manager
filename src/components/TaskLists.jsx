import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { db } from '../firebase.js';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const TaskLists = ({ user }) => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 

    const fetchTask = async () => {
        try {
            const collectionRef = collection(db, 'tasks');
            const querySnapshot = await getDocs(collectionRef);
            const taskList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(taskList);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    const TaskItem = ({ task, setTasks }) => {
        const { id, title, description, status } = task;

        const handleStatusChange = async () => {
            const taskRef = doc(db, "tasks", id);
            try {
                await updateDoc(taskRef, {
                    status: status === "pending" ? "completed" : "pending",
                });
                setTasks(prevTasks => 
                    prevTasks.map(t => 
                        t.id === id ? { ...t, status: status === "pending" ? "completed" : "pending" } : t
                    )
                );
            } catch (error) {
                console.error("Error updating status: ", error);
            }
        };

        const handleDelete = async () => {
            const taskRef = doc(db, "tasks", id);
            try {
                await deleteDoc(taskRef);
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); 
            } catch (error) {
                console.error("Error deleting task: ", error);
            }
        };
        

        return (
            <li className={status === "completed" ? "completed" : "pending"}> 
                <h3>Title: {title}</h3>
                <p>Description: {description}</p>
                <p>Status: {status} 
                </p> 
                <button onClick={handleStatusChange} className={status === "pending" ? "Completed" : "Pending"}>
                    Mark as {status === "pending" ? "Completed" : "Pending"} 
                </button>
                <button onClick={handleDelete} className='delete'><MdDelete /> Delete</button>
            </li>
        );
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "tasks"), {
                title,
                description,
                status: "pending",
            });
            setTitle("");
            setDescription("");
            fetchTask(); 
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h3>Welcome, {user}</h3>

            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit"><MdAddCircleOutline /> Add Task</button>
            </form>
            <h2>Task Lists</h2>


            <ul>
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} setTasks={setTasks} />
                ))}
            </ul>
        </div>
    );
};

export default TaskLists;
