import API from "./API.js"; // need .js for browser, VSCode omitted it

export async function loadData() {
    app.store.menu = await API.fetchMenu();
}
