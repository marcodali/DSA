import SystemIO

imc: Double -> Double -> String

imc peso altura:
    | indice <= 18 = "estas bajo de peso"
    | indice <= 25 = "peso ideal"
    | indice <= 30 = "tienes kilitos de mas"
    | otherwise = "obesidad morbida"
    where indice = peso / (altura ^ 2)

main() do:
    printStrLn "dame tu altura(en metros):"
    altura <- readLn SystemIO.Double
    printStrLn "dame tu peso(en kilos):"
    peso <- readLn SystemIO.Double
    printStrLn("tu estado es:" ++ imc peso altura)