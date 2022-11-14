use rusqlite::{Connection, Result};

#[derive(Debug)]
struct Account {
    id: i32,
    name: String,
}

fn main() -> Result<()> {
    let conn = Connection::open_in_memory()?;

    conn.execute(
        "CREATE TABLE account (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
        )",
        (), // empty list of parameters.
    )?;
    let account = Account {
        id: 0,
        name: "daccount".to_string(),
    };
    conn.execute("INSERT INTO account (name) VALUES (?1)", (&account.name,))?;

    let mut stmt = conn.prepare("SELECT id, name, data FROM account")?;
    let account_iter = stmt.query_map([], |row| {
        Ok(Account {
            id: row.get(0)?,
            name: row.get(1)?,
        })
    })?;

    for account in account_iter {
        println!("Found account {:?}", account.unwrap());
    }
    Ok(())
}
