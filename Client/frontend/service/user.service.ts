export class UserService {
    async getPayload(token: string) : Promise<any> {
        console.log('tokePayload -> ',token)
        try {
            const response = await 
                fetch(`http://localhost:3001/api/user/accessToken/${token}`,{
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok)
            {
                const payload = await response.json();
                console.log('payload is here -> ', payload)
                return payload;
            }
        } catch(error) {
            console.log('Error getpayload ', error);
        }
    } 

    async getUserById(id: string, accessToken: string) : Promise<any> {
        try {
            console.log('id-userService : ', id, 'token -> ', accessToken);
            const response = await 
                fetch(`http://localhost:3001/api/user/id/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
            if (response.ok)
            {
                const user = await response.json();
                console.log('new user ->', user);
                return user;
            }
        } catch(error) {
            console.log('Error getuserbyid ', error);
        }
    }

    // async validUserByEmail(values:any) : Promise<any> {
    //     const email = values.email;
    //     const username = values.username;
    //     try {
    //         const Response = await fetch(`http://localhost:3001/api/users/email/${email}`);
    //         const validUser = await Response.json();
    //         if (validUser.exists) {
    //             console.log('the user already exists');
    //         } else {
    //             const SendResponse = await fetch(`http://localhost:3001/api/users`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type' : 'application/json'
    //                 },
    //                 credentials: 'include',
    //                 body: JSON.stringify({email, username}),
    //             });
    //             if (sendResponse.ok) {

    //             }
    //         }
    //     } catch(error) {
    //         console.log('Error getuserby email', error);
    //         throw new Error('Response Error . please try again');
    //     }
    // }
}



