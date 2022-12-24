use std::collections::HashMap;

use crate::{Account, AccountPartial};

// filter accounts
#[tauri::command]
pub fn filter_accounts(
    accounts: Vec<Account>,
    is_icloud_included: bool,
    is_chrome_included: bool,
    is_firefox_included: bool,
) -> HashMap<String, Vec<AccountPartial>> {
    // create HashMap: key is url, value is username and source
    let mut accounts_map: HashMap<String, Vec<AccountPartial>> = HashMap::new();
    // filter accounts
    for account in accounts {
        // check if account is included
        let is_included = match account.source.as_str() {
            "icloud" => is_icloud_included,
            "chrome" => is_chrome_included,
            "firefox" => is_firefox_included,
            _ => panic!("unknown source"),
        };
        if is_included {
            // check if url exists in map
            if accounts_map.contains_key(&account.url) {
                // update value
                let accounts_vec = accounts_map.get_mut(&account.url).unwrap();
                accounts_vec.push(AccountPartial {
                    username: account.username,
                    source: account.source,
                });
                // create new Vec
                let mut new_accounts_vec = Vec::new();
                for account_partial in accounts_vec {
                    new_accounts_vec.push(AccountPartial {
                        username: account_partial.username.as_str().to_string(),
                        source: account_partial.source.as_str().to_string(),
                    });
                }
                // update value
                accounts_map.insert(account.url, new_accounts_vec);
            } else {
                // if url does not exist, add it to map
                accounts_map.insert(
                    account.url,
                    vec![AccountPartial {
                        username: account.username,
                        source: account.source,
                    }],
                );
            }
        }
    }
    // return filtered accounts
    accounts_map
}
