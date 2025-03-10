import { describe, it, expect } from 'vitest'
import Casita from './classes101'

describe("Mis Clases empiezan hoy", () => {
    it("should initialize Casita with default values", () => {
        const miCasita = new Casita()
        expect(miCasita.people).toBe(1)
        expect(miCasita.material).toBe("adobe")
    })
})