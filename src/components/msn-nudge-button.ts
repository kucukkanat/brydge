import { LitElement, html, css } from 'lit';
import { common } from './styles';

const root = "."
class Component extends LitElement {
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
        width: 35px;
        height:35px;
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
        background-size: 28px 20px;
        background-image: url(img/smiley/nudge.png);
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
    render() {
        return html`
        <button class="message" @click=${this.click}>
        
        </button>
        `;
    }
}

customElements.define('msn-nudge-button', Component);