import Image from "next/image"

const BASE_API_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/{}.png"

function Card({number}) {
    return (
        <Image
            id={`poke-${number}`}
            className="poke-card"
            width={150}
            height={150}
            alt={`Pokemon #${number}`}
            src={BASE_API_URL.replace("{}", number)}
        />
    )
}

export { Card }