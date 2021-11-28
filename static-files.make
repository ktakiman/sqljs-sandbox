all:  wasm wasm-debug db

# ---------------------------------------------------------
# those are straight out of the npm package
# ---------------------------------------------------------
wasm: public/sql-wasm.js public/sql-wasm.wasm

public/sql-wasm.js: node_modules/sql.js/dist/sql-wasm.js
	cp $< $@

public/sql-wasm.wasm: node_modules/sql.js/dist/sql-wasm.wasm
	cp $< $@

# ---------------------------------------------------------
# built with some custom modification
# ---------------------------------------------------------
wasm-debug:  public/sql-wasm-debug.js public/sql-wasm-debug.wasm

public/sql-wasm-debug.js: ../sqljs/dist/sql-wasm-debug.js
	cp $< $@

public/sql-wasm-debug.wasm: ../sqljs/dist/sql-wasm-debug.wasm
	cp $< $@

# ---------------------------------------------------------
# database files
# ---------------------------------------------------------
db: public/chinook.db

public/chinook.db: temp/chinook.db
	cp $< $@

temp/chinook.db: temp/chinook.zip
	unzip -o $< -d temp
	touch temp/chinook.db

temp/chinook.zip:
	curl -fLo temp/chinook.zip https://www.sqlitetutorial.net/wp-content/uploads/2018/03/chinook.zip 


