import { error } from "console";


export class UserService {
    async getPayload(token: string) : Promise<any> {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${token}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok)
            {
                const payload = await response.json();
                return payload;
            }
        } catch(error) {
            console.log('Error getpayload ', error);
        }
    } 


    async getUserById(id: string, token: string) : Promise<any> {
        try {
            const response = await fetch(`http://localhost:3001/api/user/id/${id}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok)
            {
                const user = await response.json();
                return user;
            }
        } catch(error) {
            console.log('Error getuserbyid ', error);
        }
    }
}