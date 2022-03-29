import React, { useContext, useEffect, useState } from 'react';

import  * as api from '../../pages/api/dashboard.service'


const useDataHandler = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [countries, setcountries] = useState([]);
    const [camps, setCamps] = useState([]);
    const [schools, setSchools] = useState([]);

    useEffect( async () => {
        init();
    },[data]);

    useEffect(async() => {
        dataHandling();
    },[data])

    const init = async () => {
        setLoading(true);
        if(data.length == 0 ) {
            try {
                let res = await api.getDashboardList(url);
                setData(res.data);
                setLoading(false)
            } catch {
            }
        }
    }

    const isItemExistHandling = (arr , item) => {
        return  arr.length > 0 && arr.find(ele => ele == item) ? true : false;
    }

    const dataHandling = () => {
        const countryList = [... countries];
        const schoolList = ['show all'];
        const campList = [...camps];
        if(data.length) {
          data.map( (item) => {
            !isItemExistHandling(countryList ,item.country) && countryList.push(item.country); //setcountries([...countries, item.country]); //
            !isItemExistHandling(schoolList ,item.school) && schoolList.push(item.school); // setSchools([...schools, item.school]);
            !isItemExistHandling(campList ,item.camp) && campList.push(item.camp); //setCamps([...camps , item.camp]);
          });
          setcountries(countryList);
          setSchools(schoolList);
          setCamps(campList);
      }
    }

  return {loading ,data , countries , camps , schools}
}

export default useDataHandler;