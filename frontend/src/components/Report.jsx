import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import Papa from 'papaparse';

const Report = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('multi_sensor_data.csv');
                const csv = await response.text();
                const parsedData = Papa.parse(csv, { header: true }).data;

                const aggregatedData = {};
                parsedData.forEach(item => {
                    const date = new Date(item.Timestamp).toLocaleDateString();
                    const key = `${date}-${item.SensorType}`;
                    aggregatedData[key] = aggregatedData[key] || { Date: date, SensorType: item.SensorType, count: 0 };
                    aggregatedData[key].count++;
                });

                setData(Object.values(aggregatedData));
            } catch (error) {
                console.error('Error fetching or parsing data:', error);
            }
        };

        fetchData();
    }, []);

    const renderChart = (ChartComponent, dataKey) => (
        <ResponsiveContainer width="100%" height={300}>
            <ChartComponent
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKey} fill="#8884d8" />
            </ChartComponent>
        </ResponsiveContainer>
    );

    return (
        <div>
            {renderChart(LineChart, 'count')}
            {renderChart(BarChart, 'count')}
        </div>
    );
}

export default Report;
