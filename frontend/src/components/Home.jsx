import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsHandThumbsUp, BsHandThumbsDown, BsFire } from 'react-icons/bs';
import { GrThreats } from 'react-icons/gr';
import axios from 'axios';
import AlertStack from './Alert.js'; // Import AlertStack component


function Home() {
    const [incidentsData, setIncidentsData] = useState([]);
    const [incidentCounts, setIncidentCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(' http://127.0.0.1:5001/incidents');
                const data = response.data;
                console.log('Data:  ',data)

                const counts = countIncidentFrequency(data);
                setIncidentCounts(counts);

                setIncidentsData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const countIncidentFrequency = (data) => {
        const counts = {};
        data.forEach(incident => {
            counts[incident.incidentName] = (counts[incident.incidentName] || 0) + 1;
        });
        return counts;
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>RECOGNIZED IND</h3>
                        <BsHandThumbsUp className='card_icon'/>
                    </div>
                    <h1>3</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>UNRECOGNIZED IND</h3>
                        <BsHandThumbsDown className='card_icon'/>
                    </div>
                    <h1>15</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>WEAPONS</h3>
                        <GrThreats className='card_icon'/>
                    </div>
                    <h1>6</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>FIRE</h3>
                        <BsFire className='card_icon'/>
                    </div>
                    <h1>8</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={Object.entries(incidentCounts).map(([incidentName, count]) => ({ incidentName, count }))}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="incidentName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={Object.entries(incidentCounts).map(([incidentName, count]) => ({ incidentName, count }))}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="incidentName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* <AlertStack /> */}

        </main>
    );
}

export default Home;