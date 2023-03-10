import { LitElement, html, css } from 'lit';
import { common } from './styles';

const root = "."
class MSNImgButton extends LitElement {
    icon: string
    size: number
    customSize: number[]
    static properties = {
        icon: { type: String },
        size: { type: Number },
        customSize: { type: Array }
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    ${common}
    :host {
        display: inline-block;
    }
    button{
        display: inline-block;
        background-color: transparent;
        border:none;
        border-radius: 2px;
        position:relative;
        width: 100%;
        height: 100%;
        display: flex-inline;
        align-items: center;
        justify-content: center;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 19px 19px;
    }
    button:hover {
        border:1px solid white;
        outline:1px solid #5e5e5e;
    }
    button:active {
        border:1px solid #5e5e5e;
        outline:1px solid #000;
    }
    `;
    firstUpdated() {
        
            this.style.width = `${this.size}px`;
            this.style.height = `${this.size}px`;
            this.shadowRoot.querySelector("button").style.backgroundSize = `${this.size-15}px ${this.size-15}px`;
   
        this.shadowRoot.querySelector("button").style.backgroundImage = `url(${root}/${this.icon})`;
    }
    render() {
        return html`
        <button class="message" @click=${this.click}>
        
        </button>
        `;
    }
}

customElements.define('msn-img-button', MSNImgButton);