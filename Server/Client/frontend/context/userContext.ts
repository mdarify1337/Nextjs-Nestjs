// "use client"
// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface UserContextProps {
//   user: any; // Define the type more specifically
//   setUser: React.Dispatch<React.SetStateAction<any>>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const accessToken = localStorage.getItem('accessToken');
//       if (accessToken) {
//         try {
//           const response = await fetch('http://localhost:3001/api/user/me', {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setUser(data);
//           }
//         } catch (error) {
//           console.error('Failed to fetch user:', error);
//         }
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
