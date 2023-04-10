import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/homepage" element={<Home />}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
