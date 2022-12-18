#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Account {
    url: String,
    username: String,
    source: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AccountPartial {
    username: String,
    source: String,
}

fn parse_record_as_account(record: &csv::StringRecord, source: &str) -> Account {
    // get necessary info
    // if source is icloud, url is 1, username is 2
    // if source is chrome, url is 1, username is 2
    // if source is firefox, url is 0, username is 1
    let url = match source {
        "icloud" => record.get(1).unwrap().to_string(),
        "chrome" => record.get(1).unwrap().to_string(),
        "firefox" => record.get(0).unwrap().to_string(),
        _ => panic!("unknown source"),
    };
    let username = match source {
        "icloud" => record.get(2).unwrap().to_string(),
        "chrome" => record.get(2).unwrap().to_string(),
        "firefox" => record.get(1).unwrap().to_string(),
        _ => panic!("unknown source"),
    };
    Account {
        url,
        username,
        source: source.to_string(),
    }
}

// return serialized accounts
#[tauri::command]
fn import_accounts(csv_data: &str, source: &str) -> Vec<Account> {
    // read csv data
    let mut rdr = csv::Reader::from_reader(csv_data.as_bytes());
    let mut accounts = Vec::new();
    for result in rdr.records() {
        let record = result.unwrap();
        let account = parse_record_as_account(&record, source);
        accounts.push(account);
    }
    // return serialized accounts
    accounts
}

// filter accounts
#[tauri::command]
fn filter_accounts(
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![import_accounts, filter_accounts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
