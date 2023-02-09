import { model, Schema } from "mongoose";
import { CreateExample } from "../types/example";

const ExampleSchema = new Schema<CreateExample>({
    prop1:String,
    prop2:Number,
    prop3:Boolean
},{timestamps:true})

export const ExampleModel = model<CreateExample>("Example",ExampleSchema)