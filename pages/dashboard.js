import React, { useEffect, useState } from 'react';
import { useRouter, Router } from 'next/router'

import DropDownList from '../shared/components/dropDownList';
import Chart from '../shared/components/chart';
import useDataHandler from '../shared/hooks/useDataHandler'


const Dashboard = () => {
   const defaultVal =  {
    country : 'Egypt',
    camp: 'Omaka',
    school: 'show all'
    }
    const [loading, setLoading] = useState(true);
    const [options , setOptions] = useState([]);
    const [groupedData , setGroupedData] = useState([]);
    const [chartData , setChartData] = useState([]);
    const [intialValues , setIntialValues] = useState(defaultVal);
    const router = useRouter();

    let {hasData,data , countries , camps , schools} = useDataHandler();

    const selectList = [];

  
  useEffect( async () => {
    data.length> 0 ? setLoading(false) : setLoading(true);
   init();
  },[data,hasData]);

  useEffect( async () => {
    chartDatatHandling();
  },[intialValues]);

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
    intialValues['school'] != 'show all'? handleSchoolChange(): allSchollsHandling();        
  }
  const allSchollsHandling = () => {
    const ChartsData = [];
    const dataVal =[];
    const dataMap =  new Map(groupedData);
    dataMap.forEach((value,key) => {
        dataVal =[];
        const color = getRandomColor();
          value.map(ele => {
            if(ele.country == intialValues.country && ele.camp === intialValues.camp) {
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
    setChartData(ChartsData);
  }

  const handleSchoolChange = () => {
    const lessonsNo= [];
    const color = getRandomColor();
    groupedData.get(intialValues['school']).map(ele => {
      ele.country == intialValues['country'] && ele.camp == intialValues['camp'] && lessonsNo.push(ele.lessons)
    });
    setChartData(
      [
        {
          label: intialValues['school'],
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
            list: countries
         },
         {
             title: 'Selected Camp',
             type: 'camp',
             list: camps
         },
         {
             title: 'Selected School',
             type: 'school',
             list: schools
         }
    ];
    setOptions(selectList)
  }

  const changeHandling = (value,type) => {
    let values = {... intialValues}
    values[type] = value;
    setIntialValues(values);
  }

  const handleClick = (school,lessons)=> {
    let pointinfo = {
      countery : intialValues.country,
      camp: intialValues.camp,
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
            <h4>Loading ....</h4>
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
                        <DropDownList key={ele.title} intialValues={intialValues} changeHandling={changeHandling} keyNo={'select_'+i} dropDown = {ele} ></DropDownList>
                    </div>
                ))
            }
        </div>

        <div className='row pt-5 mt-2'>
            <Chart key={Math.random()} data ={chartData}  handleClick={handleClick}></Chart>
        </div>
    </>
    
  )
}

export default Dashboard