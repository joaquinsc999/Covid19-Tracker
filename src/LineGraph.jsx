import React, { useState } from 'react'
import { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from "./axios"
import { buildChartData } from "./util.js"
import numeral from "numeral"
import 'chartjs-adapter-moment';
import {Chart as ChartJS, CategoryScale, LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    TimeScale,
    Filler
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Filler
  );


const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time'
      },
      y: 
        {
          grid: {
            display: false
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
    },
  };

function LineGraph({ casesType =  'cases', ...props }) {

    const [data, setData] = useState({})

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("/v3/covid-19/historical/all?lastdays=all")
            console.log(response.data)
            const chartData = buildChartData( response.data, casesType )
            setData(chartData)
            return response.data
        }

        getData() 

    }, [casesType])


    return (
        <div className={props.className}>
            {data?.length > 0 && (
        <Line
          data={{
            datasets: [{
              borderColor: '#CC1034',
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              data: data,
              fill: true,
            }]
          }}
          options={options}
        />
      )}
        </div>
    )
}

export default LineGraph
