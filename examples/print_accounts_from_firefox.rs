use account_manager::import::read_firefox_accounts;

fn main() {
    // print account from icloud csv
    let accounts = read_firefox_accounts();
    for account in accounts {
        println!("Found account {:?}", account);
    }
}
