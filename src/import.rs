use csv::StringRecord;

#[derive(Debug)]
pub struct Account {
    pub title: String,
    pub url: String,
    pub username: String,
}

fn read_csv_from_stdin<'a>() -> Vec<Result<StringRecord, csv::Error>> {
    // Build the CSV reader and iterate over each record.
    let mut rdr = csv::Reader::from_reader(std::io::stdin());
    rdr.records().collect::<Vec<_>>()
}

/// Read iCloud Keychain accounts from stdin.
/// format: Title, URL, Username, Password, Notes, OTPAuth
pub fn read_icloud_accounts() -> Vec<Account> {
    let records = read_csv_from_stdin();
    let mut accounts = Vec::new();
    for record in records {
        let record = record.unwrap();
        let account = Account {
            title: record.get(1).unwrap().to_string(),
            url: record.get(1).unwrap().to_string(),
            username: record.get(2).unwrap().to_string(),
        };
        accounts.push(account);
    }
    accounts
}

/// Read iCloud Keychain accounts from file.
/// format: Title, URL, Username, Password, Notes, OTPAuth
pub fn read_icloud_accounts_from_file(path: &str) -> Vec<Account> {
    let mut rdr = csv::Reader::from_path(path).unwrap();
    let mut accounts = Vec::new();
    for result in rdr.records() {
        let record = result.unwrap();
        let account = Account {
            title: record.get(1).unwrap().to_string(),
            url: record.get(1).unwrap().to_string(),
            username: record.get(2).unwrap().to_string(),
        };
        accounts.push(account);
    }
    accounts
}

/// Read Chrome accounts from stdin.
/// format: name, url, username, password
pub fn read_chrome_accounts() -> Vec<Account> {
    let records = read_csv_from_stdin();
    let mut accounts = Vec::new();
    for record in records {
        let record = record.unwrap();
        let account = Account {
            title: record.get(1).unwrap().to_string(),
            url: record.get(1).unwrap().to_string(),
            username: record.get(2).unwrap().to_string(),
        };
        accounts.push(account);
    }
    accounts
}

/// Read Chrome accounts from file.
/// format: name, url, username, password
pub fn read_chrome_accounts_from_file(path: &str) -> Vec<Account> {
    let mut rdr = csv::Reader::from_path(path).unwrap();
    let mut accounts = Vec::new();
    for result in rdr.records() {
        let record = result.unwrap();
        let account = Account {
            title: record.get(1).unwrap().to_string(),
            url: record.get(1).unwrap().to_string(),
            username: record.get(2).unwrap().to_string(),
        };
        accounts.push(account);
    }
    accounts
}

/// Read Firefox accounts from stdin.
/// format "url","username","password","httpRealm","formActionOrigin","guid","timeCreated","timeLastUsed","timePasswordChanged"
pub fn read_firefox_accounts() -> Vec<Account> {
    let records = read_csv_from_stdin();
    let mut accounts = Vec::new();
    for record in records {
        let record = record.unwrap();
        let account = Account {
            title: record.get(0).unwrap().to_string(),
            url: record.get(0).unwrap().to_string(),
            username: record.get(1).unwrap().to_string(),
        };
        accounts.push(account);
    }
    accounts
}

/// Read Firefox accounts from file.
/// format "url","username","password","httpRealm","formActionOrigin","guid","timeCreated","timeLastUsed","timePasswordChanged"
pub fn read_firefox_accounts_from_file(path: &str) -> Vec<Account> {
    let mut rdr = csv::Reader::from_path(path).unwrap();
    let mut accounts = Vec::new();
    for result in rdr.records() {
        let record = result.unwrap();
        let account = Account {
            title: record.get(0).unwrap().to_string(),
            url: record.get(0).unwrap().to_string(),
            username: record.get(1).unwrap().to_string(),
        };
        accounts.push(account);
    }
    accounts
}
