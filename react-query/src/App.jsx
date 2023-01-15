import './App.css';
import Posts from './Posts';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    // Provide React Query client to App
    <QueryClientProvider client={queryClient}>
    <div className='App'>
      <h1>Blog &apos;em Ipsum</h1>
      <Posts />
    </div>
    </QueryClientProvider>
  );
}

export default App;
