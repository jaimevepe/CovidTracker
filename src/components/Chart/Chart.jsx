import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({data: {confirmed, recovered, deaths, lastUpdate}, country }) => {

    const [dailyData, setDailyData] = useState([]);
    

    useEffect(() => { // to populate dailyData
        const fetchAPI = async () => {
            const lineData = await fetchDailyData();
            setDailyData(lineData);
        }
        fetchAPI();
  
    }, []);

    const lineChart = ( //lineChart is for the gobal data/gobal scale
        dailyData.length
         ? ( // if dailyData isn't = 0, then show line chart
            <Line 
              data={{ 
                  labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                  datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                  }, {
                    data: dailyData.map(({recovered}) => recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    fill: true,
                  }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                  }
                ],
                
            }}
          />) : null
    );

    const barChart = (
      confirmed
      ? (
        <Bar 
          data = {{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
              ],
              data: [confirmed.value, recovered.value, deaths.value]
            }]
          }}
          options = {{
            legend: { display: false },
            title: { display: true, fontSize: 24, text: `Current state in ${country}` }
          }}
        />
      ) : null
    )

    return (
        <div className={styles.container} >
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart