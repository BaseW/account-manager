pub mod account_manager;
pub mod filter_accounts;
pub mod import;
pub mod import_accounts;
pub mod utils;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Account {
    pub url: String,
    pub username: String,
    pub source: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AccountPartial {
    pub username: String,
    pub source: String,
}
