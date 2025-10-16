import React, {  createContext , useState} from 'react'

export const storedata = createContext();

const DataContext = ({children}) => {

  const url = "http://localhost:4000";
  const [token, settoken] = useState("");

  return (
     <>

       <storedata.Provider value={{ url, token, settoken }}>
         {children}
       </storedata.Provider>
      
     </>
  )
}

export default DataContext