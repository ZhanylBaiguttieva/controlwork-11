import { Container, CssBaseline } from '@mui/material';
import AppToolBar from './UI/AppToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/components/Login.tsx';
import Register from './features/users/components/Register.tsx';
import Items from './features/items/components/Items.tsx';
import ItemInfo from './features/items/components/ItemInfo.tsx';

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
            <Route path="/" element={<Items />} />
            <Route path="/items/:id" element={<ItemInfo />}></Route>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App;
