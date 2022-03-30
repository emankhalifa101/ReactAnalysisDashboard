import React, { useContext, useEffect, useState } from 'react';

import  * as api from '../../pages/api/dashboard'


const useDataHandler = () => {
    const [hasData, setFlag] = useState(false);
    const [data, setData] = useState([]);
    const [countries, setcountries] = useState([]);
    const [camps, setCamps] = useState([]);
    const [schools, setSchools] = useState([]);

    useEffect( async () => {
        init();
    },[data]);

    useEffect(async() => {
        dataHandling();
    },[data,hasData])

    const init = async () => {
        if(data.length == 0 ) {
            try {
                let res = await api.getDashboardList();
                setData(res.data);
            } catch {
            }
        }
    }

    const isItemExistHandling = (arr , item) => {
        return  arr.length > 0 && arr.find(ele => ele == item) ? true : false;
    }

    const dataHandling = () => {
        setFlag(false);
        const countryList = [... countries];
        const schoolList = ['show all'];
        const campList = [...camps];
        if(data.length > 0) {
          data.map( (item) => {
            !isItemExistHandling(countryList ,item.country) && countryList.push(item.country); //setcountries([...countries, item.country]); //
            !isItemExistHandling(schoolList ,item.school) && schoolList.push(item.school); // setSchools([...schools, item.school]);
            !isItemExistHandling(campList ,item.camp) && campList.push(item.camp); //setCamps([...camps , item.camp]);
          });
          setcountries(countryList);
          setSchools(schoolList);
          setCamps(campList);
          countries.length == 0 && setFlag(true);
      }

    }

  return {hasData,data , countries , camps , schools}
}

export default useDataHandler;