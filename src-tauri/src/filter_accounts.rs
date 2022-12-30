use std::collections::HashMap;

use crate::{AccountMap, AccountPartial};
use std::sync::Mutex;
use tauri::State;

// filter accounts
#[tauri::command]
pub fn filter_accounts(
    accounts_map_state: State<Mutex<AccountMap>>,
    is_icloud_included: bool,
    is_chrome_included: bool,
    is_firefox_included: bool,
) -> HashMap<String, Vec<AccountPartial>> {
    // print args
    println!(
        "is_icloud_included: {}, is_chrome_included: {}, is_firefox_included: {}",
        is_icloud_included, is_chrome_included, is_firefox_included
    );
    // print state
    let accounts_map = accounts_map_state.lock().unwrap();
    // create HashMap: key is url, value is username and source
    let mut filtered_accounts_map: HashMap<String, Vec<AccountPartial>> = HashMap::new();
    // filter accounts
    for (url, accounts_vec) in accounts_map.iter() {
        // create new Vec
        let mut new_accounts_vec = Vec::new();
        for account_partial in accounts_vec {
            // check if source is included
            if (account_partial.source == "icloud" && is_icloud_included)
                || (account_partial.source == "chrome" && is_chrome_included)
                || (account_partial.source == "firefox" && is_firefox_included)
            {
                new_accounts_vec.push(AccountPartial {
                    username: account_partial.username.as_str().to_string(),
                    password: account_partial.password.as_str().to_string(),
                    source: account_partial.source.as_str().to_string(),
                });
            }
        }
        if new_accounts_vec.len() > 0 {
            // add to filtered_accounts_map
            filtered_accounts_map.insert(url.to_string(), new_accounts_vec);
        } else {
            // remove from filtered_accounts_map
            filtered_accounts_map.remove(url);
        }
    }
    // print result length
    println!(
        "filtered_accounts_map length: {}",
        filtered_accounts_map.len()
    );
    // return filtered accounts
    filtered_accounts_map
}
