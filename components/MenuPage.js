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
    }
}

customElements.define("menu-page", MenuPage);
