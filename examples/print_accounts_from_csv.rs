use account_manager::import::read_icloud_accounts;

fn main() {
    // print account from icloud csv
    let accounts = read_icloud_accounts();
    for account in accounts {
        println!("Found account {:?}", account);
    }
}
