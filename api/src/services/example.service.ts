import { ExampleModel } from "../schemas/example.schema"
import { CreateExample, UpdateExample } from "../types/example"

export default {
    create: async (example:CreateExample) => {
        const exampleCreated = await new ExampleModel(example).save()
        return exampleCreated
    },
    getAll: async () => {
        return await ExampleModel.find()
    },

    getById: async (id:string) => {
        return await ExampleModel.findById(id)
    },
    update: async (id:string, updateProperties:UpdateExample) => {
        return ExampleModel.findByIdAndUpdate(id, updateProperties,{new:true})
    },
    delete: async (id:string) => {
        return await ExampleModel.findByIdAndDelete(id)
    }

}