import { createContext,useState } from "react";

export const AllContext=createContext();
const AppContext = (props) => {
const {children}=props;    
const [addLink, setAddLink] = useState(false);
const [UserName, setUserName] = useState('');
    return ( 
        <AllContext.Provider value={{addLink, setAddLink,UserName, setUserName}}>
            {children}
        </AllContext.Provider>
     );
}
 
export default AppContext;