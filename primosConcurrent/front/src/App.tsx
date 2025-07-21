import { useState } from 'react'
import './App.css'

const url = 'http://localhost:4004/primes'

interface Participant {
    place: number | null;
    time: number | null;
    count: number | null;
}

interface Contest {
    python: Participant;
    node: Participant;
    golang: Participant;
}

type lang = 'python' | 'node' | 'golang'
const contestants: lang[] = ['golang', 'python', 'node']

function App() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [result, setResult] = useState<Contest>({
        python: {
            place: null,
            time: null,
            count: null,
        },
        node: {
            place: null,
            time: null,
            count: null,
        },
        golang: {
            place: null,
            time: null,
            count: null,
        },
    })
    const [isReadyRunButton, setIsReadyRunButton] = useState<boolean>(false)

    function generateCountForLang(language: lang) {
        setResult((old) => {
            const updated = {
                ...old,
                [language]: {
                    ...old[language],
                    count: 250 + Math.round(Math.random() * 501),
                }
            }
            setIsReadyRunButton(contestants.every(c => updated[c].count))
            return updated
        })
    }

    async function handleRun() {
        try {
            setError(null)
            setIsLoading(true)

            const respuesta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result)
            })

            if (!respuesta.ok) {
                throw new Error(
                    `Network error: ${respuesta.status} - ${respuesta.statusText}`
                )
            }

            const data = await respuesta.json() as Contest
            setResult(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bad behavior')
        } finally {
            setIsLoading(false)
        }
    }

    if (error) {
        <>
            <h2>Felices los 3!</h2>
            <h3>Error: {error}</h3>
        </>
    }

    return (
        <>
            <h2>Felices los 3!</h2>
            <input
                type='button'
                disabled={!isReadyRunButton}
                value="Run"
                onClick={handleRun}/>
            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th>Language</th>
                        <th>Place</th>
                        <th>Time</th>
                        <th>Primes</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {contestants.map(contestant => <tr key={contestant}>
                        <th>{contestant}</th>
                        <td>{isLoading ? 'Processing...' : result[contestant].place}</td>
                        <td>{isLoading ? 'Counting...' : result[contestant].time}</td>
                        <td>{result[contestant].count}</td>
                        <td>
                            <button
                                type="submit"
                                onClick={() => generateCountForLang(contestant)}
                             >Generate</button>
                         </td>
                     </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default App
