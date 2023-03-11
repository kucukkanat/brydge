import { LitElement, html, css } from 'lit';

const root=""
class MSNImgButton extends LitElement {
    icon:string
    size:string
    static properties = {
        icon: {type:String},
        size: {type:Number}
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host {
        display: inline-block;
    }
    button{
        background-color: transparent;
        border:none;
        border-radius: 2px;
        position:relative;
        width: 25px;
        height: 25px;
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
        this.shadowRoot.querySelector("button").style.backgroundImage = `url(${root}/${this.icon}.png)`;
    }
    render() {  
        return html`
        <button class="message" @click=${this.click}>
        
        </button>
        `;
    }
}

customElements.define('msn-img-button', MSNImgButton);