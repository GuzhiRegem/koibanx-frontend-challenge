import { useState } from 'react';

export const Form = (props) => {
  const [query, setQuery] = useState({ active: true });
  const [queryFields, setQueryFields] = useState({
    _id: false,
    name: false,
    cuit: false,
    active: false
  });

  const changeFields = ({ target: { name, checked } }) => {
    setQueryFields({ ...queryFields, [name]: checked });
  };
  const handleChange = ({ target: { name, value } }) => {
    if (value) {
      if (['name', 'cuit'].includes(name)) {
        setQuery({ ...query, [name]: { $regex: value } });
      } else if (name === 'active') {
        setQuery({ ...query, [name]: value === '1' });
      } else {
        setQuery({ ...query, [name]: value });
      }
    } else {
      setQuery({ ...query, [name]: undefined });
    }
  };
  const fieldStyle = {
    display: 'flex',
    marginBottom: '2vmin'
  };
  const sendForm = () => {
    const out = {};
    Object.keys(query).map((value) => {
      if (queryFields[value]) {
        out[value] = query[value];
      }
      return 0;
    });
    props.onSearch(out);
  };
  return (
    <div style={{ padding: '2vmin', margin: 'auto', width: 'fit-content' }}>
      <h4 style={{ textAlign: 'center' }}>Filtros:</h4>
      <form>
        <div style={fieldStyle}>
          <input type='checkbox' name='_id' onChange={changeFields} />
          <div>ID:</div>
          <input type='text' id='_id' name='_id' onChange={handleChange} />
        </div>
        <div style={fieldStyle}>
          <input type='checkbox' name='name' onChange={changeFields} />
          <div>Comercio:</div>
          <input type='text' id='name' name='name' onChange={handleChange} />
        </div>
        <div style={fieldStyle}>
          <input type='checkbox' name='cuit' onChange={changeFields} />
          <div>Cuit:</div>
          <input type='text' id='cuit' name='cuit' onChange={handleChange} />
        </div>
        <div style={fieldStyle}>
          <input type='checkbox' name='active' onChange={changeFields} />
          <div>Activo:</div>
          <select name='active' onChange={handleChange}>
            <option value={1}>Si</option>
            <option value={0}>No</option>
          </select>
        </div>
      </form>
      <div className='noselect' onClick={sendForm} style={{ padding: '1vmin', color: 'white', backgroundColor: 'gray', width: 'fit-content', margin: 'auto' }}>SEARCH</div>
    </div>
  );
};
