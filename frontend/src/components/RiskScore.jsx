import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
// import axios from 'axios';

const RiskScore = () => {
  const [anomalyCount, setAnomalyCount] = useState(60);

  useEffect(() => {
    const fetchAnomalyCount = async () => {
      try {
        // Simulating API call to get anomaly count
        // Replace this with your actual API call
        const fetchedCount = Math.floor(Math.random() * 60); // Random number for demonstration
        setAnomalyCount(fetchedCount);
      } catch (error) {
        console.error('Error fetching anomaly count:', error);
      }
    };

    fetchAnomalyCount();

    const interval = setInterval(fetchAnomalyCount, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const options = {
      series: [anomalyCount],
      chart: {
        width: 240,
        height: 250,
        type: 'radialBar',
        toolbar: {
          show: true
        },
        background: 'transparent'
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#dcd8ed',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: function(val) {
                return `${Number(val)}%`;
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
            total: {
              show: true,
              label: 'Risk Score', // Change label to "Risk Score"
              fontSize: '22px',
              fontWeight: 'bold',
              formatter: function(w) {
                return anomalyCount; // Display the actual value
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#7e2fed'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Risk Score'], // Change label to "Risk Score"
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    return () => chart.destroy();
  }, [anomalyCount]);

  return (
    <div id="chart"></div>
  );
};

export default RiskScore;
