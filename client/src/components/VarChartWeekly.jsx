import { React, useEffect, useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VarChartWeekly = () => {

    let decode={}
    const navigate=useNavigate()
    const [linksdata, setLinksData] = useState([]);
    const [Months, setMonths] = useState([]);
    const [linkClicks, setLinkClicks] = useState([]);
    useEffect(() => {
        async function getData(){
            if(localStorage.getItem('token')){
                decode=jwtDecode(localStorage.getItem('token'))
           }
           else{
               navigate('/')
           }
        const submit=await axios.get(`https://treelink-server.onrender.com/api/clicksLastWeek/${decode.name}`)
        setLinksData(submit.data)
        setMonths(Object.keys( submit.data))
        setLinkClicks(Object.values( submit.data))
        
       
      }
        getData()
      }, []);  

    const labels = Months

     const data = {
      labels,
      datasets: [
        {
          label: 'clicks',
          data:linkClicks,
          backgroundColor: 'rgba(58, 38, 232)',
        },
       
      ],
    };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Link clicks from the past week',
        color:'black'

      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}


export default VarChartWeekly;
