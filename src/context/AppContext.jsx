import { createContext, useState } from "react";


export const AppContext = createContext();
export default function AppContextProvider ({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({})
    const [notes, setNotes] = useState([])

    const values= {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        notes,
        setNotes
    }

    return <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
}