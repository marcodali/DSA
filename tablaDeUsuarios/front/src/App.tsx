import { useState, useEffect } from 'react'
import './App.css'

const url = 'http://localhost:3005/users'

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

function useUserData() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchData() {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Error de red ${response.status}`)
            }

            const data = await response.json() as User[]
            setUsers(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error N/A')
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return { users, isLoading, error }
}

function App() {
    const { users, isLoading, error } = useUserData()

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h2>Error: {error}</h2>
    }

    if (users.length == 0) {
        return <h3>No Data!</h3>
    }

    const userKeys = Object.keys(users[0])
    return <>
        <h2>My Users</h2>
        <table>
            <thead>
                <tr>
                    {userKeys.map(key => <th key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {users.map(user => <tr key={user.id}>
                    {userKeys.map(key => <td key={`${user.id}-${key}`}>
                        {user[key as keyof User]}
                    </td>)}
                </tr>)}
            </tbody>
        </table>
    </>
}

export default App
