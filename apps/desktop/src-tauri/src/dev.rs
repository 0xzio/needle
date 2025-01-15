use tauri::{Manager, WebviewWindow};

#[tauri::command]
pub fn open_devtools(window: WebviewWindow) {
    window.open_devtools()
}
