#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_app::{
    __cmd__filter_accounts, __cmd__import_accounts, filter_accounts::filter_accounts,
    import_accounts::import_accounts,
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![import_accounts, filter_accounts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
