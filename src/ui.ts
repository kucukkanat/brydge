import { LitElement, html, css } from 'https://esm.sh/lit';

const COLORS = {

}

export class MSNLoginBody extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        display: block;
        padding: 10px 20px;

        width: 500px;
        left: calc(50% - 201px/2 - 0.5px);
        top: calc(50% - 116px/2);

        background: linear-gradient(180deg, #D0E4FB 0%, #CEE3F9 12.5%, #D1E6F9 25%, #D5E9FA 36.46%, #DDECFB 50%, #E3F1FD 63.54%, #E9F6FE 76.56%, #E9F7FF 88.54%, #E4F4FF 100%);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9), inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px rgba(97, 211, 244, 0.8);
        border-radius: 6px;
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`<div>
    <slot></slot>
</div>`;
    }
}
customElements.define('msn-login-body', MSNLoginBody);


const frameWidth = 80
export class MSNAvatar extends LitElement {
    static properties = {
        src: { type: String, default: "https://egyptianstreets.com/wp-content/uploads/2021/09/42d0f32a6b76790e8d6f1ad6fcd30dbe_400x400.png" },
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      #avatar-frame {
        display: block;
        border: 3px solid #ddd;
        border-radius: 20px;
        box-shadow: 0px 5px 5px #ddd;
        width: ${frameWidth}px;
        height: ${frameWidth}px;
        padding: 6px;
        margin: 10px;
        background: linear-gradient(180deg, #DBEAF8 0%, #B9D4E6 100%);
      }
      img {
        max-width: 100%;
        border-radius: 10px;
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.src = "https://egyptianstreets.com/wp-content/uploads/2021/09/42d0f32a6b76790e8d6f1ad6fcd30dbe_400x400.png"
    }

    // Render the UI as a function of component state
    render() {
        return html`<div id="avatar-frame">
    <img src=${this.src} />
</div>`;
    }
}
customElements.define('msn-avatar', MSNAvatar);


export class MSNInputTextDropdown extends LitElement {
    static properties = {
        label: { type: String },
        placeholder: { type: String },
        type: { type: String },
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host{
        max-width: calc(100% - 2 * 10px);
    }
      label,input {
        display: block;
        width: 100%:
      }
      input{
        border:1 px solid blue;
      }
      #input-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%:
      }
      #input-wrapper input {
        flex: 90%
      }
      #input-wrapper button {
        flex: 10%
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.label = '_____';
        this.placeholder = 'Placeholder';
        this.type = 'text';
    }

    // Render the UI as a function of component state
    render() {
        return html`
            <label for="ddinput">${this.label}</label>
            <div id="input-wrapper">
                <input type="text" placeholder="${this.placeholder}" type="${this.type}" id="ddinput" /><button>DOWN</button>
            </div>`;
    }
}
customElements.define('msn-input-text-dropdown', MSNInputTextDropdown);


export class MSNInputText extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        color: blue;
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}
customElements.define('msn-input-text', MSNInputText);


export class MSNInputDropdown extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        color: blue;
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}
customElements.define('msn-input-dropdown', MSNInputDropdown);


