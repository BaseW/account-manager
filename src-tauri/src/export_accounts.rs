use std::sync::Mutex;
use tauri::State;

use crate::AccountMap;

#[tauri::command]
pub fn export_accounts(accounts_map_state: State<Mutex<AccountMap>>) -> String {
    // export accounts as csv like following:
    // url,username,password,source

    // get accounts_map
    let accounts_map = accounts_map_state.lock().unwrap();

    // create csv string
    let mut csv_string = String::new();
    csv_string.push_str("url,username,password,source");
    csv_string.push_str("\n");
    // iterate accounts_map
    for (url, accounts_vec) in accounts_map.iter() {
        for account_partial in accounts_vec {
            csv_string.push_str(url);
            csv_string.push_str(",");
            csv_string.push_str(&account_partial.username);
            csv_string.push_str(",");
            csv_string.push_str(&account_partial.password);
            csv_string.push_str(",");
            csv_string.push_str(&account_partial.source);
            csv_string.push_str("\n");
        }
    }

    // print length
    println!("csv_string length: {}", csv_string.len());

    return csv_string;
}
