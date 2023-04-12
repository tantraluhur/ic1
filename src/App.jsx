import { Routes, Route, Redirect  } from 'react-router-dom';

import Home from "./pages/home"
import Detail from "./pages/detail"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/homepage" element={<Home />}/>    
        <Route path="/detail/:id" element={<Detail />}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
