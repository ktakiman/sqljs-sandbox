import React, { useState, useEffect, useCallback, useRef } from 'react';
import { init , loadChinookDb, createEmptyDb } from './sqldb';
import QueryResult from './query-result';

import './sqlview.scss';

const Queries = {
  LIST_TABLE: 'SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE "sqlite_%"'
};

const query1 = 'SELECT * FROM artists';

/* eslint-disable no-unused-vars */

const SqlView = () => {

  const [result, setResult] = useState();

  const db = useRef(null);

  useEffect(() => {
    init();
  }, []);

  const onChangeDb = async e => {
    switch (e.target.value) {
    case 'empty-db':
      db.current = createEmptyDb();
      break;
    case 'chinook-db':
      db.current = await loadChinookDb();
      break;
    }
  };

  const [query, setQuery] = useState(query1);

  const onShowTable = () => {
    if (db.current) {
      const result = db.current.exec(Queries.LIST_TABLE);
      console.log(result);
      if (result.length > 0) {
        setResult(result[0]);
      }
    }
  };

  const onQuery = useCallback(() => {
    const result = db.current.exec(query);
    setResult(result[0]);
  }, [query]);

  return (
    <div className='code sqlview'>
      <div>
        <select onChange={onChangeDb}>
          <option style={{display: 'none' }}/>
          <option value='empty-db'>Empty DB</option>      
          <option value='chinook-db'>Chinook DB</option>      
        </select>
      </div>
      <div className='section'>
        <button onClick={onShowTable}>Show tables</button>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={onQuery}>query</button>
      </div>
      <div className='section'>
        {result && <QueryResult result={result} />}
      </div>
    </div>
  );
};

export default SqlView;
