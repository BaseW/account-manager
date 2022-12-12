use account_manager::{
    account_manager::{AccountManager, AccountManagerResult},
    utils::{add_sample_data, delete_sample_data, prepare_sample_tables},
};

fn main() -> AccountManagerResult<()> {
    let path = "sample.db3";
    prepare_sample_tables(path);
    add_sample_data(path);

    let account_manager = AccountManager::new(path)?;
    let accounts = account_manager.get_accounts()?;

    for account in accounts {
        println!("Found account {:?}", account);
    }

    delete_sample_data(path);

    Ok(())
}
