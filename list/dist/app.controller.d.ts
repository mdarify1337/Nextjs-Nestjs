import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    googlelogin(req: any): Promise<void>;
    googleLoginCallback(req: any, res: any): Promise<void>;
}
