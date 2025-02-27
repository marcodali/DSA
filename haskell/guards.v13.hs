import System.IO

imc :: Double -> Double -> String
imc peso altura
    | indice <= 18 = "bajo peso"
    | indice <= 25 = "normal"
    | indice <= 30 = "sobrepeso"
    | otherwise = "obesidad morbida"
    where indice = peso / (altura ^ 2)

main :: IO ()
main = do
    putStrLn "Dame tu altura(en metros):"
    h <- readLn :: IO Double
    putStrLn "Dame tu peso(en kilos):"
    w <- readLn :: IO Double
    putStrLn("Diagnostico: " ++ imc w h)