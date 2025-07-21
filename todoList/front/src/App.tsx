import React, { useEffect, useState } from 'react'
import './App.css'

const url = 'http://localhost:3030/tasks'

interface Task {
    id: number;
    description: string;
    isCompleted: boolean;
}

function Creator({ setTasks }: {setTasks: React.Dispatch<React.SetStateAction<Task[]>>}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [description, setDescription] = useState<string>('')

    async function createNewTask() {
        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({description})
            })

            if (!response.ok) {
                throw new Error(`Network Error: ${response.status}`)
            }

            const newTask = await response.json()
            setTasks((oldTasks) => [newTask, ...oldTasks])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Algo salio mal')
        } finally {
            setIsLoading(false)
        }
    }

    function handler(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && description.trim().length > 0) {
            createNewTask()
            setDescription('')
        }
    }

    if (error) {
        return (
            <>
                <h3>Error añadiendo nueva task: {error}</h3>
                <input
                    type="text"
                    disabled={isLoading}
                    placeholder='Description here...'
                    onKeyDown={handler}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}>
                </input>
            </>
        )
    }

    return <input
        type="text"
        disabled={isLoading}
        placeholder='Description here...'
        onKeyDown={handler}
        onChange={(e) => setDescription(e.target.value)}
        value={description}>
    </input>
}

function Display({ tasks }: { tasks: Task[] }) {
    return (
        <table>
            <tbody>
                {tasks.map(task => <tr key={task.id}>
                    <td>{task.description}</td>
                </tr>)}
            </tbody>
        </table>
    )
}

function useTaskData() {
    const [errorDisplay, setErrorDisplay] = useState<string | null>(null)
    const [loadingDisplay, setLoadingDisplay] = useState<boolean>(true)
    const [tasks, setTasks] = useState<Task[]>([])

    async function fetchTasks() {
        try {
            setLoadingDisplay(true)
            setErrorDisplay(null)

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Network Error: ${response.status}`)
            }

            const data = await response.json()
            setTasks(data)
        } catch (err) {
            setErrorDisplay(err instanceof Error ? err.message : 'Algo salio muy mal')
        } finally {
            setLoadingDisplay(false)
        }
    }

    useEffect(() => {
        fetchTasks()     
    }, [])

    return { errorDisplay, tasks, setTasks, loadingDisplay }
}

function App() {
    const { errorDisplay, tasks, setTasks, loadingDisplay } = useTaskData()

    if (errorDisplay) {
        return (
            <>
                <h1>Brian Ricardo daily list</h1>
                <Creator setTasks={setTasks} />
                <h3>Error retrieving your tasks: {errorDisplay}</h3>
            </>
        )
    }

    if (loadingDisplay) {
        return (
            <>
                <h1>Brian Ricardo daily list</h1>
                <Creator setTasks={setTasks} />
                <h3>Loading tasks...</h3>
            </>
        )
    }

    if (tasks.length == 0) {
        return (
            <>
                <h1>Brian Ricardo daily list</h1>
                <Creator setTasks={setTasks} />
                <h3>No tasks! Create a new one!!</h3>
            </>
        )
    }

    return (
        <>
            <h1>Brian Ricardo daily list</h1>
            <Creator setTasks={setTasks} />
            <Display tasks={tasks} />
        </>
    )
}

export default App
