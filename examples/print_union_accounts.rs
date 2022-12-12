use account_manager::import::read_icloud_accounts_from_file;
use std::collections::HashSet;

fn main() {
    // get icloud csv path from stdin
    let icloud_csv_path = std::env::args().nth(1).unwrap();
    // get chrome csv path from stdin
    let chrome_csv_path = std::env::args().nth(2).unwrap();
    // get firefox csv path from stdin
    let firefox_csv_path = std::env::args().nth(3).unwrap();

    // initialize HashSet
    let mut account_set = HashSet::<String>::new();

    // read accounts from icloud csv file
    let accounts = read_icloud_accounts_from_file(&icloud_csv_path);
    // add url to HashSet
    for account in accounts {
        account_set.insert(account.url);
    }

    // read account from chrome csv file
    let accounts = read_icloud_accounts_from_file(&chrome_csv_path);
    // add url to HashSet
    for account in accounts {
        account_set.insert(account.url);
    }

    // read account from firefox csv file
    let accounts = read_icloud_accounts_from_file(&firefox_csv_path);
    // add url to HashSet
    for account in accounts {
        account_set.insert(account.url);
    }

    // print all accounts
    for account in account_set {
        println!("{}", account);
    }
}
