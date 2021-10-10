import initSqlJs from 'sql.js';

const test = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `/${file}`
  });

  console.log({ SQL });
  
  // chinook.db file is served from 'public' direcotry, where I just put a downloaded file
  const dbData = await fetch('/chinook.db').then(resp => resp.arrayBuffer()).then(buf => new Uint8Array(buf));
  console.log({ dbData });

  const db = new SQL.Database(dbData);

  const result = db.exec('SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE "sqlite_%"');

  console.log({ result });
};

export default test;
