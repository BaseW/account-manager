pub mod account_manager;
pub mod export_accounts;
pub mod filter_accounts;
pub mod import;
pub mod import_accounts;
pub mod utils;

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Account {
    pub url: String,
    pub username: String,
    password: String,
    pub source: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AccountPartial {
    pub username: String,
    password: String,
    pub source: String,
}

pub type AccountMap = HashMap<String, Vec<AccountPartial>>;
