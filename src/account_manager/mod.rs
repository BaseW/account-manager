use sqlite::open_db;
use std::fmt;

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
    pub tags: Option<Vec<Tag>>,
}

#[derive(Debug)]
pub struct AccountInput {
    pub name: String,
}

#[derive(Debug)]
pub struct TagInput {
    pub name: String,
}

#[derive(Debug)]
pub struct AccountDelete {
    pub id: i32,
}

#[derive(Debug)]
pub struct TagDelete {
    pub id: i32,
}

#[derive(Debug)]
pub struct AccountManagerError;

impl fmt::Display for AccountManagerError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "AccountManagerError: {:?}", self)
    }
}

pub type AccountManagerResult<T> = std::result::Result<T, AccountManagerError>;

#[derive(Debug)]
pub struct AccountManager {
    conn: rusqlite::Connection,
}

// AccountManager manages accounts and tags.
// Account has id and name.
// Tag also has id and name.
// Account can have multiple tags.
// Tag can be assigned to multiple accounts.
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
            .prepare("SELECT id, name FROM accounts")
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        let account_iter = stmt
            .query_map([], |row| {
                Ok(Account {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    tags: None,
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

    pub fn get_accounts_with_tags(&self) -> AccountManagerResult<Vec<Account>> {
        let mut accounts: Vec<Account> = Vec::new();

        let mut stmt = self
            .conn
            .prepare(
                "SELECT accounts.id, accounts.name, tags.id, tags.name
                 FROM accounts
                 LEFT JOIN account_tag ON accounts.id = account_tag.account_id
                 LEFT JOIN tags ON account_tag.tag_id = tags.id",
            )
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        let account_iter = stmt
            .query_map([], |row| {
                Ok(Account {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    tags: Some(vec![Tag {
                        id: row.get(2)?,
                        name: row.get(3)?,
                    }]),
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

    pub fn add_account(&self, account: &AccountInput) -> AccountManagerResult<()> {
        self.conn
            .execute("INSERT INTO accounts (name) VALUES (?1)", (&account.name,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn update_account(&self, account: &Account) -> AccountManagerResult<()> {
        self.conn
            .execute(
                "UPDATE accounts SET name = ?1 WHERE id = ?2",
                (&account.name, &account.id),
            )
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn delete_account(&self, account: &AccountDelete) -> AccountManagerResult<()> {
        self.conn
            .execute("DELETE FROM accounts WHERE id = ?1", (&account.id,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn add_tag(&self, tag: &TagInput) -> AccountManagerResult<()> {
        self.conn
            .execute("INSERT INTO tags (name) VALUES (?1)", (&tag.name,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn update_tag(&self, tag: &Tag) -> AccountManagerResult<()> {
        self.conn
            .execute(
                "UPDATE tags SET name = ?1 WHERE id = ?2",
                (&tag.name, &tag.id),
            )
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn delete_tag(&self, tag: &TagDelete) -> AccountManagerResult<()> {
        self.conn
            .execute("DELETE FROM tags WHERE id = ?1", (&tag.id,))
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn assign_tag_to_account(&self, account: &Account, tag: &Tag) -> AccountManagerResult<()> {
        self.conn
            .execute(
                "INSERT INTO account_tag (account_id, tag_id) VALUES (?1, ?2)",
                (&account.id, &tag.id),
            )
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }

    pub fn unassign_tag_from_account(
        &self,
        account: &Account,
        tag: &Tag,
    ) -> AccountManagerResult<()> {
        self.conn
            .execute(
                "DELETE FROM account_tag WHERE account_id = ?1 AND tag_id = ?2",
                (&account.id, &tag.id),
            )
            .unwrap_or_else(|err| {
                // throw AccountManagerError
                panic!("Error: {}", err);
            });
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use crate::utils::prepare_sample_tables;

    use super::*;

    #[test]
    fn test_add_account() {
        let db_path = "test.db3";
        prepare_sample_tables(db_path);

        let account_manager = AccountManager::new(db_path).unwrap();
        let account = AccountInput {
            name: "test".to_string(),
        };
        account_manager.add_account(&account).unwrap();

        let accounts = account_manager.get_accounts().unwrap();
        assert_eq!(accounts.len(), 1);
        assert_eq!(accounts[0].name, "test");
    }
}
