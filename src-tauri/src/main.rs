#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Account {
    url: String,
    username: String,
    from: String,
}

fn parse_record_as_account(record: &csv::StringRecord, from: &str) -> Account {
    // get necessary info
    // if from is icloud, url is 1, username is 2
    // if from is chrome, url is 1, username is 2
    // if from is firefox, url is 0, username is 1
    let url = match from {
        "icloud" => record.get(1).unwrap().to_string(),
        "chrome" => record.get(1).unwrap().to_string(),
        "firefox" => record.get(0).unwrap().to_string(),
        _ => panic!("unknown from"),
    };
    let username = match from {
        "icloud" => record.get(2).unwrap().to_string(),
        "chrome" => record.get(2).unwrap().to_string(),
        "firefox" => record.get(1).unwrap().to_string(),
        _ => panic!("unknown from"),
    };
    Account {
        url,
        username,
        from: from.to_string(),
    }
}

// return serialized accounts
#[tauri::command]
fn import_accounts(csv_data: &str, from: &str) -> Vec<Account> {
    // read csv data
    let mut rdr = csv::Reader::from_reader(csv_data.as_bytes());
    let mut accounts = Vec::new();
    for result in rdr.records() {
        let record = result.unwrap();
        let account = parse_record_as_account(&record, from);
        accounts.push(account);
    }
    // return serialized accounts
    accounts
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![import_accounts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
