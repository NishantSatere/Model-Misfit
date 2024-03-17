import React from 'react'

 
 import { BsExclamationCircleFill, BsGrid1X2Fill, BsFillArchiveFill, BsFillCameraVideoFill } from 'react-icons/bs';
 import { MdSecurity } from "react-icons/md";
 import { TbSettingsFilled } from "react-icons/tb";
 import RiskScore from './RiskScore';
 import axios from 'axios'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const handleClick = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:5001/generate-csv', {}, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('CSV file generated successfully');
        } catch (error) {
          console.error('Error generating CSV file:', error.message);
        }
      };
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <MdSecurity  className='icon_header'/> WatchTower AI
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
                <a href="/Video">
                    <BsFillArchiveFill className='icon'/> Live Mointoring
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/alert">
                    <BsExclamationCircleFill className='icon'/> Alerts
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
                <a href="/reports">
                    <BsFillArchiveFill className='icon'/> Reports
                </a>
            </li> */}
            <li className='sidebar-list-item'>
                <a href="/setting">
                    <TbSettingsFilled className='icon'/> Settings
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/livecam" onClick={handleClick}>
                    <BsFillCameraVideoFill className='icon'/> Live Camera
                </a>
            </li>
             {/* <li className='sidebar-list-item'>
                <a href="/Video">
                    <BsFillArchiveFill className='icon'/> Recorded Videos
                </a>
            </li> */}
        </ul>
        <div className="risk-score-wrapper">
            <RiskScore />
        </div>

        
    </aside>
  )
}

export default Sidebar