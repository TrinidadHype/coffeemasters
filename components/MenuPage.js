export class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });

        // Can also preload the css in index.html
        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS() {
            const res = await fetch("/components/MenuPage.css");
            const css = await res.text();
            styles.textContent = css;
        }
        loadCSS();
    }

    // When component is attached to the DOM
    connectedCallback() {
        // Can move this code back to constructor if using Shadow DOM
        const template = document.getElementById("menu-page-template");
        const content = template.content.cloneNode(true); // deep clone
        this.root.appendChild(content);

        window.addEventListener("appmenuchange", () => {
            this.render();
        });

        this.render();
    }

    render() {
        if (app.store.menu) {
            this.root.querySelector("#menu").innerHTML = "";
            for (let category of app.store.menu) {
                const liCategory = document.createElement("li");
                liCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class="category">
                    </ul>
                `;
                this.root.querySelector("#menu").appendChild(liCategory);

                category.products.forEach((product) => {
                    const item = document.createElement("product-item");
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector("ul").appendChild(item);
                });
            }
        } else {
            this.root.querySelector("#menu").innerHTML = "Loading...";
        }
    }
}

customElements.define("menu-page", MenuPage);
