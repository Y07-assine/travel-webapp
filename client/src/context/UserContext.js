import React,{createContext,useState} from 'react';




const UserContext = createContext({});


const UserContextProvider = (props)=>{
    const [user,setUser] = useState(null);

    const signin = (profile,history) =>{
        try{
            localStorage.setItem('profile',JSON.stringify(profile));
            setUser(profile);
            history.push('/');
        }catch(error){
            console.log(error);
        }
    };


    const signout = ()=>{
        localStorage.removeItem('profile');
        setUser(null);
    }
    const isAuthenticated=()=>{
        return localStorage.getItem('profile');
    }
    const authContextValue = {
        signin,
        signout,
        isAuthenticated
    }

    return(
        <UserContext.Provider value={authContextValue} {...props} />
    );
};
const useAuth = () => React.useContext(UserContext);
export {UserContextProvider,useAuth}; 