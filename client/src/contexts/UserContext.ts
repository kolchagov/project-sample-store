import React from 'react';
import User from "../model/User";

const UserContext = React.createContext({
    user: {} as User,
    login: async (credentials: { email: string, password: string }) => { },
    logout: async () => { }
})

export default UserContext;