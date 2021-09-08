import React,{createContext,useState} from 'react';
import { useQuery,gql} from '@apollo/client';



const UserContext = createContext({});

const Costumer = gql`
    query getUser($email:String!,$pwd:String!){
        costumers(where:{email:$email,password:$pwd}){
            username
          }
    }
`

const UserContextProvider = (props)=>{
    const [user,setUser] = useState(null);

    const Signin = (email,pwd,history) =>{
        try{
            const {data} = useQuery(Costumer,{
                variables:{email:email,password:pwd},
            },);
                localStorage.setItem('profile',JSON.stringify(data.costumer));
                setUser(data.costumer);

            
            history.push('/');
        }catch(error){
            console.log(error);
        }
    };


    const signout = ()=>{
        localStorage.clear();
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