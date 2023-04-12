import Detail from "../components/detail.tsx"
import "../styles/index.css"
import { useParams, useHistory } from 'react-router-dom';

import { useEffect, useState, useContext } from "react";

function DetailPages() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState([])
  const { id } = useParams();

  const URL = "https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws" 
  const fetchDetalData = async () => {
    try{
        let response = await fetch(`${URL}/expenses/${id}`)
        const data = await response.json()
        setDetailData(data)
      }
      catch (error){
        setError(error)
      }
      setIsLoading(true)
  }

  useEffect(()=>{
    fetchDetalData()
  }, [])

  if(error){
    return <div>ERROR</div>
  }
  
  if (!isLoading){
    return <div>LOADING..</div>
  }
  return (
    <div className="h-screen flex justify-center items-center gap-x-10">
        <Detail name={detailData.name} image={detailData.category.name} id={detailData.id} notes={detailData.description}
        type={detailData.category.name} time={detailData.created_at.slice(11,16)} date={detailData.created_at.slice(0,10)}
        amount={detailData.amount}/>
    </div>
  );
  }
  
  export default DetailPages;
  