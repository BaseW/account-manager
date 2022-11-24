use sqlite::open_db;

mod sqlite;

#[derive(Debug)]
pub struct Tag {
    pub id: i32,
    pub name: String,
}

#[derive(Debug)]
pub struct Account {
    pub id: i32,
    pub name: String,
}

#[derive(Debug)]
pub struct AccountManagerError {
    message: String,
}

pub type AccountManagerResult<T> = std::result::Result<T, AccountManagerError>;

#[derive(Debug)]
pub struct AccountManager {
    conn: rusqlite::Connection,
}

impl AccountManager {
    pub fn new(db_path: &str) -> AccountManagerResult<AccountManager> {
        let conn = open_db(db_path).unwrap_or_else(|err| {
            // throw AccountManagerError
            panic!("Error: {}", err);
        });
        Ok(AccountManager { conn })
    }

    pub fn get_accounts(&self) -> AccountManagerResult<Vec<Account>> {
        let mut accounts: Vec<Account> = Vec::new();

        let mut stmt = self
            .conn
            .prepare("SELECT id, name FROM account")
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        let account_iter = stmt
            .query_map([], |row| {
                Ok(Account {
                    id: row.get(0)?,
                    name: row.get(1)?,
                })
            })
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });

        for account in account_iter {
            let account = account.unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
            accounts.push(account);
        }

        Ok(accounts)
    }

    pub fn add_account(&self, account: &Account) -> AccountManagerResult<()> {
        self.conn
            .execute("INSERT INTO account (name) VALUES (?1)", (&account.name,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn update_account(&self, account: &Account) -> AccountManagerResult<()> {
        self.conn
            .execute(
                "UPDATE account SET name = ?1 WHERE id = ?2",
                (&account.name, &account.id),
            )
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn delete_account(&self, account: &Account) -> AccountManagerResult<()> {
        self.conn
            .execute("DELETE FROM account WHERE id = ?1", (&account.id,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn add_tag(&self, tag: &Tag) -> AccountManagerResult<()> {
        self.conn
            .execute("INSERT INTO tag (name) VALUES (?1)", (&tag.name,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn update_tag(&self, tag: &Tag) -> AccountManagerResult<()> {
        self.conn
            .execute(
                "UPDATE tag SET name = ?1 WHERE id = ?2",
                (&tag.name, &tag.id),
            )
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn delete_tag(&self, tag: &Tag) -> AccountManagerResult<()> {
        self.conn
            .execute("DELETE FROM tag WHERE id = ?1", (&tag.id,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }
}
