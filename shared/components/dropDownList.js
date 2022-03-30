import React ,{ useState ,useEffect} from 'react';

const DropDownList = (props) => {  
     
  const handleChange = (value , key) => { 
    props.changeHandling(value , key);
  }
  return (
    <>
        <div className='row'>
            <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
                <label key={props.intialValues[props.dropDown.type]? props.intialValues[props.dropDown.type] : props.keyNo+Math.random()} className='mt-2' >{props.dropDown.title}</label>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8" >
                <select value={props.intialValues[props.dropDown.type]}
                onChange= {e => handleChange(e.target.value,props.dropDown.type)} key={props.keyNo+'_dropdList'} 
                className="form-select" 
                >
                    {props.dropDown.list && props.dropDown.list.map( (item , i) => 
                      <option key={item + i} value={item}>{item}</option>
                      )}
                </select>
            </div>
        </div>
    </>
  )
}

export default DropDownList