import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import gsap from 'gsap'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const MIN_PAGE = 0
const MAX_PAGE = 30
const POKEMOS_PER_PAGE = 20

export default function Inicio() {
    const [CURRENT_PAGE, setCurrentPage] = useState(0)
    useEffect(() => {
        gsap.set(".poke-card", { opacity: 0, y: -100 })
        gsap.to(".poke-card", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.045,
            ease: "power2.out"
        })
    }, [CURRENT_PAGE])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key == "ArrowLeft" || event.key == "ArrowUp") {
                handleLeft()
            } else if (event.key == "ArrowRight" || event.key == "ArrowDown") {
                handleRight()
            }
        }
        window.addEventListener("keydown", handleKeyPress)
        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [CURRENT_PAGE])

    function handleRight() {
        if (CURRENT_PAGE < MAX_PAGE) {
            setCurrentPage(previous => previous+1)
        }
    }

    function handleLeft() {
        if (CURRENT_PAGE > MIN_PAGE) {
            setCurrentPage(previous => previous-1)
        }
    }
    
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex items-center w-full max-w-7xl space-x-4'>
                <button
                    onClick={handleLeft}
                    disabled={CURRENT_PAGE == MIN_PAGE}
                    className={`text-2xl w-10 flex-shrink-0 ${
                        CURRENT_PAGE === MIN_PAGE
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black cursor-pointer"
                      }`}
                >
                    <FaChevronLeft />
                </button>
                <div className='flex-grow'>
                    <div className='grid grid-rows-5 grid-cols-4 gap-2 place-items-center'>
                        {Array(POKEMOS_PER_PAGE)
                            .fill(0)
                            .map((_, index) => {
                                const item = CURRENT_PAGE*POKEMOS_PER_PAGE+index+1
                                return <Card key={item} number={item} />
                            })
                        }
                    </div>
                </div>
                <button
                    onClick={handleRight}
                    disabled={CURRENT_PAGE == MAX_PAGE}
                    className={`text-2xl w-10 flex-shrink-0 ${
                        CURRENT_PAGE === MAX_PAGE
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black cursor-pointer"
                      }`}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}