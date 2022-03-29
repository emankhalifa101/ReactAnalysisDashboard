import React , { useState ,useEffect }from 'react';
import { useRouter } from 'next/router';


const PointDetails = () => {

   const [query, setQuery] = useState({})
    const router = useRouter();
    const { data } = router.query;

    useEffect( () => {
      setQuery(JSON.parse(data))
     },[data]);

  return (
    <div >
      <h3> Point Details </h3>
      <ul>
       {query && Object.entries(query).map(([key ,item]) => (
          <li key={key}> {key } : {item}</li>
        )
        )}
      </ul>
    </div>
  )
}

export default PointDetails