import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <>
      <div id="detail">
          <Outlet />
      </div>
    </>
  )
}

export default DefaultLayout