use std::sync::Mutex;

use tauri::State;

use crate::{Account, AccountMap, AccountPartial};

fn parse_record_as_account(record: &csv::StringRecord, source: &str) -> Account {
    // get necessary info
    // if source is icloud, url is 1, username is 2, and password is 3
    // if source is chrome, url is 1, username is 2, and password is 3
    // if source is firefox, url is 0, username is 1, and password is 2
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
    let password = match source {
        "icloud" => record.get(3).unwrap().to_string(),
        "chrome" => record.get(3).unwrap().to_string(),
        "firefox" => record.get(2).unwrap().to_string(),
        _ => panic!("unknown source"),
    };
    Account {
        url,
        username,
        password,
        source: source.to_string(),
    }
}

// return serialized accounts
#[tauri::command]
pub fn import_accounts(
    accounts_map_state: State<Mutex<AccountMap>>,
    csv_data: &str,
    source: &str,
) -> Vec<Account> {
    let mut accounts_map = accounts_map_state.lock().unwrap();
    // read csv data
    let mut rdr = csv::Reader::from_reader(csv_data.as_bytes());
    for result in rdr.records() {
        let record = result.unwrap();
        let account = parse_record_as_account(&record, source);
        // accounts.push(account);
        // add account to accounts_map
        // check if url exists in map
        if accounts_map.contains_key(&account.url) {
            // update value
            let accounts_vec = accounts_map.get(&account.url).unwrap();
            // create new Vec
            let mut new_accounts_vec = Vec::new();
            for account_partial in accounts_vec {
                new_accounts_vec.push(AccountPartial {
                    username: account_partial.username.as_str().to_string(),
                    password: account_partial.password.as_str().to_string(),
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
                    password: account.password,
                    source: account.source,
                }],
            );
        }
    }
    let mut accounts = Vec::new();
    for (url, accounts_vec) in accounts_map.iter() {
        for account_partial in accounts_vec {
            accounts.push(Account {
                url: url.as_str().to_string(),
                username: account_partial.username.as_str().to_string(),
                password: account_partial.password.as_str().to_string(),
                source: account_partial.source.as_str().to_string(),
            });
        }
    }
    // print result length
    println!("accounts length: {}", accounts.len());
    // return serialized accounts
    accounts
}
