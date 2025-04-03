import React, {useState, useContext, useReducer} from "react";
import { useEffect } from "react";
import { getUsuario } from "./GetDB/GetDB";

const dataContext = React.createContext();
const setDataContext = React.createContext();

const userContext = React.createContext();
const setUserContext = React.createContext();

export function useDataContext(){
    return useContext(dataContext);
}

export function useSetDataContext(){
    return useContext(setDataContext);
}

export function useUserContext(){
    return useContext(userContext);
}

export function useSetUserContext(){
    return useContext(setUserContext);
}

export function DataProvider({children}){
    
    var initialStateData = {
            
        search: {
            busqueda: "",
            ciudad: '',
            categoria: '',
            lblCategoria: ''
        },
        
        ux: {
            idComercio: 0,
            scroll: 5,
            limLisEmpresas: 18 //limite de empresas a mostrar en listados
        }
    };
    const [data, setData] = useReducer((state, updates) => ({...state, ...updates}), initialStateData);
    
    const setDataProvider = (data) =>{
        setData(data);
    }

    // Si existen datos en sessionStorage los carga en Data
    useEffect(() => {
        const DataJSON = window.sessionStorage.getItem('data');
        if (DataJSON) {
            const sessionStorageData = JSON.parse( DataJSON );
            setData(sessionStorageData);
        }
    }, [])

    useEffect(() =>{
        window.sessionStorage.setItem('data', JSON.stringify(data))
        
    },[data])


//__________________________________________ usuario __________________________________________

    function reduceUser(state, updates){
        if (updates.action == 'clean') {
            window.localStorage.removeItem('user')
            return null
        }
        return updates
    }

    const initialStateUser = null;
    const [user, setUser] = useReducer((state, updates) => reduceUser(state, updates), initialStateUser);
    
    const setUserProvider = (user) =>{
        setUser(user);
    }
    
    useEffect(() => {

        async function fetchData() {
            const UserJSON = window.localStorage.getItem('user');
            if (UserJSON) {
                const sessionStorageUser = JSON.parse( UserJSON );
                const userDB = await getUsuario(sessionStorageUser);
                setUser(userDB);
            }
          }
          fetchData();

    }, [])


    useEffect(() =>{

        async function fetchData(id) {
                getUsuario(id).then((result)=>{
                    setUser(result);
                });
            }
            
            if (user) {
                if (!user.correo) {
                    fetchData(user);
                }
                console.log(user);
                window.localStorage.setItem('user', JSON.stringify(user.id))
        }
        
    },[user])
    
    
    return(
        <dataContext.Provider value={data}>
            <setDataContext.Provider value={setDataProvider}>
                <userContext.Provider value={user}>
                    <setUserContext.Provider value={setUserProvider}>
                        {children}
                    </setUserContext.Provider>
                </userContext.Provider>
            </setDataContext.Provider>
        </dataContext.Provider>
    );
}