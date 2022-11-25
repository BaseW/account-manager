use rusqlite::Connection;

pub fn prepare_sample_table(db_path: &str) {
    let conn = Connection::open(db_path).unwrap();
    conn.execute(
        "CREATE TABLE IF NOT EXISTS account (
                  id              INTEGER PRIMARY KEY,
                  name            TEXT NOT NULL
                  )",
        [],
    )
    .unwrap();
}

pub fn add_sample_data(db_path: &str) {
    let conn = Connection::open(db_path).unwrap();
    conn.execute("INSERT INTO account (name) VALUES (?1)", &["Alice"])
        .unwrap();
    conn.execute("INSERT INTO account (name) VALUES (?1)", &["Bob"])
        .unwrap();
    conn.execute("INSERT INTO account (name) VALUES (?1)", &["Carol"])
        .unwrap();
}

pub fn delete_sample_data(db_path: &str) {
    let conn = Connection::open(db_path).unwrap();
    conn.execute("DELETE FROM account", []).unwrap();
}
