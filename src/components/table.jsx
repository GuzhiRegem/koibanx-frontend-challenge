import { useEffect, useState } from 'react';
import { getData } from '../utils/requests';

export const Table = (props) => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [sortKey, setSortKey] = useState(undefined);
  const [inverseSort, setInverseSort] = useState(false);
  const sortList = (arr, sortBy) => {
    let inv = inverseSort;
    if (!sortBy) {
      if (!sortKey) {
        setList(arr); return;
      } else {
        sortBy = sortKey;
      }
    } else {
      if (sortBy === sortKey) {
        inv = !inv;
      }
    }
    const { compare } = Intl.Collator('en-US');
    const StrCompare = (a, b) => {
      const aD = inv ? b : a;
      const bD = inv ? a : b;
      return compare(aD, bD);
    };
    const DateCompare = (a, b) => {
      const aD = inv ? (new Date(b)) : (new Date(a));
      const bD = inv ? (new Date(a)) : (new Date(b));
      if (aD < bD) { return -1; }
      if (aD < bD) { return 1; }
      return 0;
    };
    const PriceCompare = (a, b) => {
      a = a.substring(1);
      b = b.substring(1);
      const aD = inv ? parseFloat(b) : parseFloat(a);
      const bD = inv ? parseFloat(a) : parseFloat(b);
      if (aD < bD) { return -1; }
      if (aD < bD) { return 1; }
      return 0;
    };
    switch (sortBy) {
      case 'id':
        setList([...arr].sort((a, b) => StrCompare(a.ID, b.ID)));
        break;
      case 'name':
        setList([...arr].sort((a, b) => StrCompare(a.Comercio, b.Comercio)));
        break;
      case 'cuit':
        setList([...arr].sort((a, b) => StrCompare(a.CUIT, b.CUIT)));
        break;
      case 'active':
        setList([...arr].sort((a, b) => StrCompare(a.Activo, b.Activo)));
        break;
      case 'balance':
        setList([...arr].sort((a, b) => PriceCompare(a['Balance actual'], b['Balance actual'])));
        break;
      case 'date':
        setList([...arr].sort((a, b) => DateCompare(a['Última venta'], b['Última venta'])));
        break;
    }
    setInverseSort(inv);
    setSortKey(sortBy);
  };
  const buttonSort = (sortName) => {
    return () => {
      sortList(data.data, sortName);
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(props.query, page);
      setData(res);
      sortList(res.data, undefined);
      if (page > res.pages) { setPage(data.pages); }
    };
    fetchData()
      .catch(console.error);
  }, [props.query, page]);
  const buttonFunc = (change) => {
    return () => {
      const out = page + change;
      if (out > 0 && out <= data.pages) {
        setPage(out);
      }
    };
  };
  const classSel = (name) => {
    return (sortKey === name) ? (inverseSort ? 'desc' : 'asc') : null;
  };
  const headGen = (name) => {
    return { className: classSel(name), onClick: buttonSort(name) };
  };
  return (
    <div>
      <div style={{ textAlign: 'center' }}>Results: <strong>{data.total}</strong></div>
      <table>
        <tbody>
          <tr>
            <th {...(headGen('id'))}>ID</th>
            <th {...(headGen('name'))}>Comercio</th>
            <th {...(headGen('cuit'))}>CUIT</th>
            <th>Concepto 1</th>
            <th>Concepto 2</th>
            <th>Concepto 3</th>
            <th>Concepto 4</th>
            <th>Concepto 5</th>
            <th>Concepto 6</th>
            <th {...(headGen('balance'))}>Balance actual</th>
            <th {...(headGen('active'))}>Activo</th>
            <th {...(headGen('date'))}>Ultima venta</th>
          </tr>
          {
            list
              ? (
                  list.map((val) => {
                    return (
                      <tr key={val.ID}>
                        <td>{val.ID}</td>
                        <td>{val.Comercio}</td>
                        <td>{val.CUIT}</td>
                        <td>{val.Conceptos[0]}</td>
                        <td>{val.Conceptos[1]}</td>
                        <td>{val.Conceptos[2]}</td>
                        <td>{val.Conceptos[3]}</td>
                        <td>{val.Conceptos[4]}</td>
                        <td>{val.Conceptos[5]}</td>
                        <td>{val['Balance actual']}</td>
                        <td>{val.Activo}</td>
                        <td>{val['Última venta']}</td>
                      </tr>
                    );
                  }))
              : (null)
          }
        </tbody>
      </table>
      <div style={{ display: 'flex', width: 'fit-content', backgroundColor: 'red', borderRadius: '3px', margin: 'auto' }} className='noselect'>
        <div style={{ padding: '1vmin' }} onClick={buttonFunc(-1)}>{'<-'}</div>
        <div style={{ padding: '1vmin', backgroundColor: 'white' }}>{data.page}/{data.pages}</div>
        <div style={{ padding: '1vmin' }} onClick={buttonFunc(1)}>{'->'}</div>
      </div>
    </div>
  );
};
