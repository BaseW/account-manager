use rusqlite::{Connection, Result};

pub fn open_db(path: &str) -> Result<Connection> {
    Connection::open(path)
}
