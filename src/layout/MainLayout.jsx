import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AppAppBar from '../components/AppAppBar'

const MainLayout = () => {
    const [mode, setMode] = useState('light');
    const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
  return (
    <>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <div id="detail" style={{backgroundColor: '#f2f2f2'}}>
            <Outlet />
        </div>
    </>
  )
}

export default MainLayout