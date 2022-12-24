use crate::Account;

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
pub fn import_accounts(csv_data: &str, source: &str) -> Vec<Account> {
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
