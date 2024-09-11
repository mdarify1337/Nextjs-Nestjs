export declare class AppService {
    googleLogin(req: any): "No user from google" | {
        message: string;
        user: any;
    };
    getHello(): string;
    hello(): string;
}
