export interface CreateExample {
    prop1:string;
    prop2:number;
    prop3:boolean;
}

export type UpdateExample = Partial<CreateExample>