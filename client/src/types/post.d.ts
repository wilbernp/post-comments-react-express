export interface IAuthor {
    _id: string;
    username: string;
}

export interface IComment {
    _id: string;
    content: string;
    author: IAuthor;
}

export interface IPost {
    _id: string;
    content: string;
    author: IAuthor;
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}