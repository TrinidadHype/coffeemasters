const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((a) => {
            a.addEventListener("click", (event) => {
                event.preventDefault();
                const url = event.target.getAttribute("href"); // a.href(gives full URL) attr and prop aren't always the same, event.target. can work too
                Router.go(url);
            });
        });
        // Event handler for URL changes
        window.addEventListener("popstate", (event) => {
            // uses state we setup on history.pushState call in Router.go, false because we don't want to add history when going backwards
            Router.go(event.state.route, false);
        });

        // Check initial URL, use for deeplinking
        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {
        console.log(`Going to route ${route}`);

        if (addToHistory) {
            history.pushState({ route }, null, route);
        }

        // Use inject/remove technique for loading pages'
        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("h1");
                pageElement.textContent = "Menu";
                break;
            case "/order":
                pageElement = document.createElement("h1");
                pageElement.textContent = "Your Order";
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("h1");
                    pageElement.textContent = "Your Order";
                    const paramId = route.substring(route.lastIndexOf("-") + 1);
                    pageElement.dataset.id = paramId;
                }
        }

        if (pageElement) {
            const main = document.querySelector("main");
            // childNodes (NodeList) gives comments, whitespace etc. vs children (HTMLCollection)
            // document.querySelector("main").children[0].remove()
            main.innerHTML = "";
            main.appendChild(pageElement);
            // reset the scroll position on navigation
            window.scrollX = 0;
            window.scrollY = 0;
        }
    },
};

export default Router;
