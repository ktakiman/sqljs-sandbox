import React, { useState, useEffect, useCallback } from 'react';
import { init, execQuery, testEmptyDb } from './sqljs-test';

import './sqlview.scss';

const query1 = 'SELECT * FROM artists';

const ResultRow = ({ row }) => {
  return (
    <tr>
      {row.map((v, i) => <td key={i}>{v}</td>)}
    </tr>);
};

const SqlView = () => {

  const [result, setResult] = useState({
    columns: ['col1', 'col2'],
    values: [[1, 'a'], [2, 'b'], [3, 'c']]
  });

  useEffect(() => {
    const tables = init();
    tables.then(data => {
      // console.log(data);
      setResult(data[0]);
    });
  }, []);

  const [query, setQuery] = useState(query1);

  const onQuery = useCallback(() => {
    execQuery(query).then(result => setResult(result[0]));
  }, [query]);

  return (
    <div className='code sqlview'>
      <div>
        <button onClick={() => testEmptyDb()}>Empty Db Test</button>
      </div>
      <div className='query'>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={onQuery}>query</button>
      </div>
      <table>
        <thead><tr>{result.columns.map((name, i) => <th key={i}>{name}</th>)}</tr></thead>
        <tbody>
          {result.values.map((row, i) => <ResultRow key={i} row={row} />)}
        </tbody>
      </table>
    </div>
  );
};

export default SqlView;
