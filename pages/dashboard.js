import React, { useContext, useEffect, useState } from 'react';
import { useRouter, Router } from 'next/router'

import DropDownList from '../shared/components/dropDownList';
import Chart from '../shared/components/chart';
import useDataHandler from '../shared/hooks/useDataHandler'


const Dashboard = () => {
    const [options , setOptions] = useState([]);
    const [groupedData , setGroupedData] = useState([]);
    const [chartData , setChartData] = useState([]);
    const [currentCountry , setCurrentCountry] = useState("Egypt");
    const [currentCamp , setCurrentCamp] = useState('Omaka');
    const [currentSchool , setCurrentSchool] = useState("show all");
    const [updateChart,setUpdateChart] = useState(false);
    const router = useRouter();

    const url = 'https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json';
    let {loading ,data , countries , camps , schools} = useDataHandler(url);

    const selectList = [];

  
  useEffect( async () => {
   init();
  },[]);

  const init = async() => {
    selectListFormating();
    dataFormating()
    chartDatatHandling();
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
  const chartDatatHandling = () => {
    const ChartsData = [];
    const dataVal =[];
    const dataMap =  new Map(groupedData);
    dataMap.forEach((value,key) => {
        dataVal =[];
        const color = getRandomColor();
          value.map(ele => {
            if(ele.country == currentCountry && ele.camp == currentCamp) {
              dataVal.push(ele.lessons)
            }
        });
        dataVal.length > 0 &&
        ChartsData.push({
        label: key,
        data: dataVal,
        borderColor: color,
        backgroundColor: color,
        });
    });
    setUpdateChart(true);
    setChartData(ChartsData);    
  }

  const handleSchoolChange = () => {
    const lessonsNo= [];
    const color = getRandomColor();
    groupedData.get(currentSchool).map(ele => {
      ele.country == currentCountry && ele.camp == currentCamp && lessonsNo.push(ele.lessons)
    });
      setChartData(
        [
          {
            label: currentSchool,
            data: lessonsNo,
            borderColor: color,
            backgroundColor: color,
            }
        ]
      ); 
  }

  const selectListFormating = () => {
    selectList = [
        {
            title: 'Selected Country',
            type: 'country',
            intialValue: currentCountry,
            list: countries
         },
         {
             title: 'Selected Camp',
             type: 'camp',
             intialValue: currentCamp,
             list: camps
         },
         {
             title: 'Selected School',
             type: 'school',
             intialValue: currentSchool,
             list: schools
         }
    ];
    setOptions(selectList)
  }

  const changeHandling = (value,type) => {
    switch (type) {
        case 'country' : setCurrentCountry(value);
        break;
        case 'camp': setCurrentCamp(value);
        break;
        case 'school': setCurrentSchool(value);
        break;
    }
    type == 'school' && value !== 'show all'? handleSchoolChange(): chartDatatHandling();
  }

  const handleClick = (school,lessons)=> {
    let pointinfo = {
      countery : currentCountry,
      camp: currentCamp,
      school: school,
      lessons: lessons
    }
    router.push({pathname : '/pointDetails',
      query : { data: JSON.stringify(pointinfo)}}
    )
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
        <div className='row mt-5' key={Math.random()}>
            {
                options.map( (ele , i) => (
                    <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
                        <DropDownList key={ele.title} changeHandling={changeHandling} keyNo={'select_'+i} dropDown = {ele} ></DropDownList>
                    </div>
                ))
            }
        </div>

        <div className='row pt-5 mt-2'>
            <Chart key={Math.random()} data ={chartData} onUpdate={updateChart} handleClick={handleClick}></Chart>
        </div>
    </>
    
  )
}

export default Dashboard