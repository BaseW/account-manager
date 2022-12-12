use account_manager::import::read_chrome_accounts;

fn main() {
    // print account from icloud csv
    let accounts = read_chrome_accounts();
    for account in accounts {
        println!("Found account {:?}", account);
    }
}
