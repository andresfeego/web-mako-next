import React, {useState, useContext, useReducer} from "react";
import { useEffect } from "react";

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
            scroll: 0
        }
    };

    // Si existen datos en sessionStorage los carga en Data
    useEffect(() => {
        const DataJSON = window.sessionStorage.getItem('data');
        if (DataJSON) {
            const sessionStorageData = JSON.parse( DataJSON );
            setData(sessionStorageData);
        }
    }, [])

    const initialStateUser = {
            name: "Andres Manrique"
    };


    const [data, setData] = useReducer((state, updates) => ({...state, ...updates}), initialStateData);
    const [user, setUser] = useReducer((state, updates) => ({...state, ...updates}), initialStateUser);

    const setDataProvider = (data) =>{
        setData(data);
    }

    const setUserProvider = (user) =>{
        setUser(user);
    }


    useEffect(() =>{
        window.sessionStorage.setItem('data', JSON.stringify(data))

    },[data])


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