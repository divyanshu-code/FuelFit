import React, {  createContext , useState} from 'react'

export const storedata = createContext();

const DataContext = ({children}) => {

  const url = "https://fuelfit.onrender.com";
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
