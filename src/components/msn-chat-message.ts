import { LitElement, css, html } from "lit";
import { common } from "./styles";

class Component extends LitElement {
    from:string
    message:string
    static get styles() {
        return css`
            ${common}
        `;
    }
    static get properties() {
        return {
            from: { type: String },
            message: { type: String },
        };
    }
    protected render(): unknown {
        return html`
            <div class="muted">${this.from} says:</div>
            <div>${this.message}</div>
        `;
    }
}
customElements.define("msn-chat-message", Component);