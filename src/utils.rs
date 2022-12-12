use rusqlite::Connection;

pub fn prepare_sample_tables(db_path: &str) {
    let conn = Connection::open(db_path).unwrap();
    // create accounts table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS accounts (
                  id              INTEGER PRIMARY KEY,
                  name            TEXT NOT NULL
                  )",
        [],
    )
    .unwrap();
    // create tags table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS tags (
                  id              INTEGER PRIMARY KEY,
                  name            TEXT NOT NULL
                  )",
        [],
    )
    .unwrap();
    // create account_tag table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS account_tag (
                  account_id      INTEGER NOT NULL,
                  tag_id          INTEGER NOT NULL,
                  PRIMARY KEY (account_id, tag_id),
                  FOREIGN KEY (account_id) REFERENCES accounts (id),
                  FOREIGN KEY (tag_id) REFERENCES tags (id)
                  )",
        [],
    )
    .unwrap();
}

pub fn add_sample_data(db_path: &str) {
    let conn = Connection::open(db_path).unwrap();
    conn.execute("INSERT INTO accounts (name) VALUES (?1)", &["Alice"])
        .unwrap();
    conn.execute("INSERT INTO accounts (name) VALUES (?1)", &["Bob"])
        .unwrap();
    conn.execute("INSERT INTO accounts (name) VALUES (?1)", &["Carol"])
        .unwrap();
}

pub fn delete_sample_data(db_path: &str) {
    let conn = Connection::open(db_path).unwrap();
    conn.execute("DELETE FROM account", []).unwrap();
}

pub fn reset_sample_tables(db_path: &str) {
    let conn = Connection::open(db_path).unwrap();
    conn.execute("DROP TABLE IF EXISTS account_tag", [])
        .unwrap();
    conn.execute("DROP TABLE IF EXISTS accounts", []).unwrap();
    conn.execute("DROP TABLE IF EXISTS tags", []).unwrap();
}
