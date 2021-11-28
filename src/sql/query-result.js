import React from 'react';

import './query-result.scss';

const ResultRow = ({ row }) => {
  return (
    <tr>
      {row.map((v, i) => <td key={i}>{v}</td>)}
    </tr>);
};

const QueryResult = ({ result }) => {
  return (
    <table>
      <thead><tr>{result.columns.map((name, i) => <th key={i}>{name}</th>)}</tr></thead>
      <tbody>
        {result.values.map((row, i) => <ResultRow key={i} row={row} />)}
      </tbody>
    </table>
  );
};

export default QueryResult;
