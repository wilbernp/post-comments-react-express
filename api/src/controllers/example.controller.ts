import { Request, Response } from "express"
import exampleService from "../services/example.service"
import { UpdateExample } from "../types/example"

export default {
    create: async (req: Request, res: Response) => {
        const createdExample = await exampleService.create(req.body)
        res.send(createdExample)
    },
    getAll: async (req: Request, res: Response) => {
        const allExamples = await exampleService.getAll()
        res.send(allExamples)
    },
    getById: async (req: Request, res: Response) => {
        const example = await exampleService.getById(req.params.id)
        res.send(example)
    },
    update: async (req: Request, res: Response) => {
        const updateProperties = req.body as UpdateExample
        const updatedExample = await exampleService.update(req.params.id, updateProperties)
        res.send(updatedExample)
    },
    delete: async (req: Request, res: Response) => {
        const deletedExample = await exampleService.delete(req.params.id)
        res.send(deletedExample)
    },
}