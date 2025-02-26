import { createContext, useContext, useState } from 'react'

const userContext = createContext();

const authContext = ({children}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }

  return (
    <userContext.Provider value={{ user, login, logout }}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext);
export default authContext
