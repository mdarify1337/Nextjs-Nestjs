export declare class User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    picture: string;
    provider: string;
    email: string;
    username: string;
    googleToken: string;
    generateUUID(): void;
}
