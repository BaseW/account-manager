use account_manager::account_manager::{AccountManager, AccountManagerResult};

fn main() -> AccountManagerResult<()> {
    let path = "sample.db3";
    let account_manager = AccountManager::new(path)?;
    let accounts = account_manager.get_accounts()?;

    for account in accounts {
        println!("Found account {:?}", account);
    }

    Ok(())
}
