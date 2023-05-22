// Use type="module" in script tag to make it ESModules
import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

//make global for entire app, break out of module
window.app = { store: Store, router: Router };

// DOMContentLoaded event happens after DOM is parsed and scripts are executed
// Better to wait just in case DOM objects have been loaded into memory just yet
// "load" waits for everything (images, font etc) therefore we miss a chance to start using DOM earlier
window.addEventListener("DOMContentLoaded", async () => {
    loadData();
    app.router.init();
});
