#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{collections::HashMap, sync::Mutex};

use tauri::Manager;
use tauri_app::{
    __cmd__filter_accounts, __cmd__import_accounts, filter_accounts::filter_accounts,
    import_accounts::import_accounts, AccountMap,
};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let accounts_map_state: Mutex<AccountMap> = Mutex::new(HashMap::new());
            app.manage(accounts_map_state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![import_accounts, filter_accounts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
