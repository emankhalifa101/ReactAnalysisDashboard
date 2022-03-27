import React from 'react'

const DropDownList = (props) => {
  const handleChange = (value , key) => {
    props.changeHandling(value , key);
  }
  console.log('props.dropDown.intialValue',props.dropDown.intialValue);

  return (
    <>
        <div className='row'>
            <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
                <label key={props.keyNo+Math.random()} className='mt-2' >{props.dropDown.title}</label>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8" >
                <select 
                value={props.dropDown.intialValue} 
                onChange= {e => handleChange(e.target.value,props.dropDown.type)} key={props.keyNo+'_dropdList'} 
                className="form-select" 
                >
                    {props.dropDown.list && props.dropDown.list.map( (item , i) => 
                      <option selected={props.dropDown.intialValue} key={item + i} value={item}>{item}</option>
                      )}
                </select>
            </div>
        </div>
    </>
  )
}

export default DropDownList