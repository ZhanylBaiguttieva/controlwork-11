import { Container, CssBaseline } from '@mui/material';
import AppToolBar from './UI/AppToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/components/Login.tsx';
import Register from './features/users/components/Register.tsx';

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolBar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App;
