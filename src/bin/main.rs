use account_manager::account_manager::{AccountManager, AccountManagerResult};

fn main() -> AccountManagerResult<()> {
    let path = "sample.db3";
    let account_manager = AccountManager::new(path)?;
    let accounts = account_manager.get_accounts()?;

    for account in accounts {
        println!("Found account {:?}", account);
    }
    // let conn = open_db(path)?;

    // conn.execute(
    //     "CREATE TABLE account (
    //         id    INTEGER PRIMARY KEY,
    //         name  TEXT NOT NULL,
    //     )",
    //     (), // empty list of parameters.
    // )?;
    // let account = Account {
    //     id: 0,
    //     name: "daccount".to_string(),
    // };
    // conn.execute("INSERT INTO account (name) VALUES (?1)", (&account.name,))?;

    // let mut stmt = conn.prepare("SELECT id, name FROM account")?;
    // let account_iter = stmt.query_map([], |row| {
    //     Ok(Account {
    //         id: row.get(0)?,
    //         name: row.get(1)?,
    //     })
    // })?;

    // for account in account_iter {
    //     println!("Found account {:?}", account.unwrap());
    // }
    Ok(())
}
