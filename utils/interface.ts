
export interface IBlog {
    id: string;
    slug: string;
    url: string;
    title: string;
    content: string;
    image: string;
    thumbnail: string;
    status: string;
    category: string;
    publishedAt: number;
    updatedAt: number;
    userId: number;
}

export interface IComment {
    id: number;
    postId: number;
    userId: number;
    comment: string;
}

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    login: {
        username: string;
    };
    email: string;
}