import './App.css';
import Posts from './Posts';

function App() {
  return (
    // Provide React Query client to App
    <div className='App'>
      <h1>Blog &apos;em Ipsum</h1>
      <Posts />
    </div>
  );
}

export default App;
