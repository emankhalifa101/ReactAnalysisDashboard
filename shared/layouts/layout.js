import React from 'react';
import Head from 'next/head';

const Layout = ({children}) => {
  return (
      <>
        <Head>
            <title></title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
        </Head>
        <div className='container sectionPadding'>
            <div className='row'>
                <div className='col-12'>
                    <main key={Math.random()}>{ children }</main>  
                </div>
            </div>
        </div>
      </>
  )
}

export default Layout