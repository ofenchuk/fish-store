import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import NotFound from './NotFound'
import StorePicker from './StorePicker'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<StorePicker />} />
        <Route path="/store/:storeId" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
