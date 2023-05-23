import { React, useEffect, useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const PieClicks = () => {

  let decode={}
      const navigate=useNavigate()
      const [linksdata, setLinksData] = useState([]);
      const [linksNames, setLinksNames] = useState([]);
      const [linkClicks, setLinkClicks] = useState([]);
      useEffect(() => {
          async function getData(){
              if(localStorage.getItem('token')){
                  decode=jwtDecode(localStorage.getItem('token'))
             }
             else{
                 navigate('/')
             }
          const submit=await axios.get(`https://treelink-server.onrender.com/api/getUserLinks/${decode.name}`)
          setLinksData(submit.data)
          const names=submit.data.links.map(ev=>ev.name)
          const clicks=submit.data.links.map(ev=>ev.numberOfClicks)
          setLinksNames(names)
          setLinkClicks(clicks)
         
        }
          getData()
        }, []);  
        
 const data = {
  labels: linksNames,
  datasets: [
    {
      label: 'Number of Clicks',
      data: linkClicks,
      backgroundColor: [
        'rgba(255, 9, 132, 0.7)',
        'rgba(14, 142, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(78, 200, 100, 0.7)',
        'rgba(108, 144, 4, 0.7)',
        'rgba(39, 19, 64, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(78, 200, 100, 1)',
        'rgba(108, 144, 4, 1)',
        'rgba(39, 19, 64, 1)',
      ],
      borderWidth: 1,
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
      text: 'All of your link clicks',
      color:'black'

    },
  },
};
    return (
    
      <Pie data={data} options={options}/>
       
    );
  }
  
  export default PieClicks;
  