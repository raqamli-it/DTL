import React, { createContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataCt, setDataCt] = useState(() => {
    // localStorage-dan ma'lumotlarni yuklash
    const savedData = localStorage.getItem("myData");
    return savedData ? JSON.parse(savedData) : null; // Agar localStorage bo'sh bo'lsa, null qaytaradi
  });
  useEffect(() => {
    if (dataCt !== null) {
      localStorage.setItem("myData", JSON.stringify(dataCt));
    }
  }, [dataCt]);

  return (
    <DataContext.Provider value={{ dataCt, setDataCt }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;