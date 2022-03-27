import React, { useContext, useEffect, useState } from 'react';

import DropDownList from '../shared/components/dropDownList';
import Chart from '../shared/components/chart'

import  * as api from '../shared/services/dashboard.service'
 
//import Item from '../shared/models/item.model'

// export async function getStaticProps() {
//     const res = await fetch('https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json')
//     const data = await res.json();
//     return {
//       props: {
//         data
//       },
//     }
//   }


const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [countries, setcountries] = useState([]);
    const [camps, setCamps] = useState([]);
    const [schools, setSchools] = useState([]);
    const [options , setOptions] = useState([]);
    const [groupedData , setGroupedData] = useState([]);
    const [chartData , setChartData] = useState([]);
    const [currentCountry , setCurrentCountry] = useState("Egypt");
    const [currentCamp , setCurrentCamp] = useState('Omaka');
    const [currentSchool , setCurrentSchool] = useState("show all");
    const [updateChart,setUpdateChart] = useState(false);

    const selectList = [];
    const url = 'https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json';

  
  useEffect( () => {
   init();
  },[]);

  useEffect(() => {
    dataHandling();
  },[data])

  useEffect(() => {
    chartDtatHandling();
  },[currentCountry,currentCamp])


  const init = async () => {
      if(data.length == 0 ) {
          try {
              setLoading(true)
              let res = await api.getDashboardList(url);
              setData(res.data);
          } catch {
            setLoading(false)
          }
      }
  }
  
  const dataHandling = () => {
      const countryList = [... countries];
      const schoolList = [...schools];
      const campList = [...camps];
      if(data.length) {
        data.map( (item) => {
            !isItemExistHandling(countryList ,item.country) && countryList.push(item.country) //setcountries([...countries, item.country])
            !isItemExistHandling(schoolList ,item.school) && schoolList.push(item.school); //setSchools([...schools, item.school]);
            !isItemExistHandling(campList ,item.camp) && campList.push(item.camp); //setCamps([...camps , item.camp]);
        });
        setcountries(countryList);
        setSchools(schoolList);
        setCamps(campList);
        selectListFormating();
        dataFormating()
        chartDtatHandling();
        setLoading(false);
    } else {
        setLoading(true);
    }
  }
  const  getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

    const dataFormating = () => {
        const groupedMap = data.reduce(
        (entryMap, e) => entryMap.set(e.school, [...entryMap.get(e.school)||[], e]),
        new Map()
        );
        setGroupedData(groupedMap)    
    }
  const chartDtatHandling = () => {
    const ChartsData = [];
    const dataMap =  new Map(groupedData);
    //console.log('dataMap',dataMap);
    dataMap.forEach((value,key) => {
        const color = getRandomColor();
        const dataVal = value.map(ele => {
            if(ele.country == currentCountry && ele.camp == currentCamp) {
                return ele.lessons
            }
        });
        dataVal = dataVal.filter(Boolean);
        //console.log('dataVal',dataVal); 
        dataVal.length > 0 &&
        ChartsData.push({
        label: key,
        data: dataVal,
        borderColor: color,
        backgroundColor: color,
        });
        setUpdateChart(true);
        setChartData(ChartsData)
    })
    //console.log('chartData',chartData); 
  }

  const isItemExistHandling = (arr , item) => {
    return  arr.length > 0 && arr.find(ele => ele == item) ? true : false;
  }

  const selectListFormating = () => {
    selectList = [
        {
            title: 'Selected Country',
            type: 'country',
            list: countries
         },
         {
             title: 'Selected Camp',
             type: 'camp',
             list: camps
         },
         {
             title: 'Delected School',
             type: 'school',
             list: schools
         }
    ];
    setOptions(selectList)
  }

  const changeHandling = (value,type) => {
    switch (type) {
        case 'country' : setCurrentCamp(value);
        break;
        case 'camp': setCurrentCamp(value);
        break;
        case 'school': setCurrentSchool(value);
        break;
    }
  }



  if (loading) {
      return (
          <>
            Loading ....
          </>
      )
  }



  return (
    <>
        <h2>Analysis Chart</h2>
        <h3>Number of Lessons </h3>
        <div className='row mt-5'>
            {
                options.map( (ele , i) => (
                    <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
                        <DropDownList key={ele.type} changeHandling={changeHandling} keyNo={'select_'+i} dropDown = {ele} ></DropDownList>
                    </div>
                ))
            }
        </div>

        <div className='row pt-5 mt-2'>
            <Chart data ={chartData} onUpdate={updateChart}></Chart>

        </div>
    </>
    
  )
}

export default Dashboard