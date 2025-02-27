import System.IO

imc :: Double -> Double -> String
imc altura peso
    | indice <= 18 = "estas muy flaco"
    | indice <= 25 = "peso ideal"
    | indice <= 30 = "gordito"
    | otherwise = "obesidad morbida"
    when indice = peso / (altura ^ 2)

main :: IO ()
main = do
    putStrLn "dame tu altura(en metros): "
    h <- readLn :: IO Double
    putStrLn "dame tu peso(en kilos): "
    w <- readLn :: IO Double
    putStrLn("tu estado actual es " ++ imc h w)