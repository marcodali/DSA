import { describe, it, expect } from "vitest"
import request from "supertest"
import { server } from "./express_crud.v12"

describe("Express server basic setup", () => {
    it("should give no answer when a huge budget is received", async () => {
        await request(server)
            .put("/comida")
            .send({ budget: 5000 })
            .expect(204)
    })

    it("should return 405 for a different method other than PUT", async () => {
        await request(server)
            .delete("/comida")
            .expect(405)
    })

    it("should return 404 for a non-existent-route", async () => {
        await request(server)
            .get("/food")
            .expect(404)
    })

    it("should return error when no budget is provided", async () => {
        const response = await request(server)
            .put("/comida")
            .expect(401)
        
        expect(response.text).contains("tienes hambre?", "no hungry no budget")
    })
})

describe("Budgeting", () => {
    it("should give kung fu panda advice when zero budget is provided", async () => {
        const response = await request(server)
            .put("/comida")
            .send({ budget: 0 })
            .expect(201)
        
        expect(response.body.advice).contains("jugo de universo", "el guerrero dragon no come")
    })

    it("should give burrito advice when little budget", async () => {
        const response = await request(server)
            .put("/comida")
            .send({ budget: 100 })
            .expect(202)
        
        expect(response.body.advice).contains("burrito", "el burrito es para pobres")
    })

    it("should give italianis advice when decent budget", async () => {
        const response = await request(server)
            .put("/comida")
            .send({ budget: 1000 })
            .expect(203)
        
        expect(response.body.advice).contains("italianis", "rico y de calidad pero caro")
    })
})
