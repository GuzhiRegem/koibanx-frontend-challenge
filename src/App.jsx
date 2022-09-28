import { useState } from 'react';
import './App.css';
import { Table } from './components/table';
import { Form } from './components/form';

function App () {
  const [query, setQuery] = useState({});

  const searchFunc = (q) => {
    setQuery(q);
  };
  return (
    <div className='App'>
      <h1 style={{ textAlign: 'center' }}>koibanx-frontend-challenge</h1>
      <Form onSearch={searchFunc} />
      <Table query={query} />
    </div>
  );
}

export default App;
