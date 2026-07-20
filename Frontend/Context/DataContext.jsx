import React, { createContext, useState } from 'react'

export const storedata = createContext();

const DataContext = ({ children }) => {

  const url = "https://fuelfit-backend.onrender.com";   // "http://localhost:4000"  isliye comment kiya hai kyun ki backend onrender.com par deployed hai
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
