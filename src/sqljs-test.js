import initSqlJs from 'sql.js';

// 1) Create SQL object by calling initSqlJs
// 2) Create database instance
//    - new SQL.Database(-- uint8array --)
// 3) do stuff with database
//    - query
//    - update
let SQL;
let chinookDb = null;

const init = async () => {
  SQL = await initSqlJs({
    locateFile: file => {
      // I got to specify the url to load the wasm file with this callback!!
      console.log(`locateFile: file = ${file}`);
      return `/${file}`;
    }
  });

  // console.log({ SQL });
  
  // chinook.db file is served from 'public' direcotry, where I just put a downloaded file
  const dbData = await fetch('/chinook.db')
    .then(resp => resp.arrayBuffer())
    .then(buf => new Uint8Array(buf));

  // console.log({ dbData });

  chinookDb = new SQL.Database(dbData);
  const result = await chinookDb.exec('SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE "sqlite_%"');
  return result;
};

const execQuery = async query => {
  const result = await chinookDb.exec(query);
  return result;
};

const testEmptyDb = async () => {
  const db = new SQL.Database();

  let sqlstr = `CREATE TABLE mytable (a int, b char, c char);
  INSERT INTO mytable VALUES (0, 'hello', 'Foo');
  INSERT INTO mytable VALUES (1, 'hello', 'Frog');
  INSERT INTO mytable VALUES (2, 'howdy', 'Fung');
  INSERT INTO mytable VALUES (3, 'world', 'Bar');`;
  db.run(sqlstr);

  // let stmt = db.prepare('INSERT INTO mytable VALUES (:i, :s1, :s2)");

  // let result = await db.exec('SELECT c FROM mytable');
  // console.log(result);

  // result = await db.exec('SELECT a, c FROM mytable WHERE NOT b="hello"');
  // result = await db.exec('SELECT a, c FROM mytable WHERE a BETWEEN 1 AND 2');
  // const values = result[0].values;
  // console.log(JSON.stringify(values, null, 2));
  //

  const stmt = db.prepare('SELECT a, b, c FROM mytable WHERE a=:i');
  console.log(stmt.get({ ':i': 1 }));

  stmt.bind([2]);
  stmt.step();
  console.log(stmt.get());
};


export { init, execQuery, testEmptyDb };
