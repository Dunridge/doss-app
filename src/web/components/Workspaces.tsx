import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../style/Workspaces.css'
import ReadMe from './ReadMe'
import WorkspaceList from './WorkspaceList'

function Workspaces() {
  const navigate = useNavigate()

  return (
    <>
      <div className="Workspaces__header" onClick={() => navigate('/')}>
        Dosspace
      </div>
      <div className="Workspaces__content">
        <Routes>
          <Route path="/readme" element={<ReadMe />} />
          <Route path="*" element={<WorkspaceList />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </>
  )
}

export default Workspaces
