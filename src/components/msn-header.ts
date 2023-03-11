import { LitElement, html, css } from 'lit';

class MSNHeader extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        display: block;
        height: 100px;
        padding-left: 10px;
        padding-top: 5px;
        background-image: url("backgrounds/background-large.png");
        background-size: 100% 100%;

        // Disable text select
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
      }
      #window-bar {
        color: white;
        padding-bottom: 5px;
      }
      #window-bar span, #window-bar img {
        height: 15px;
        display: inline-block;
      }
      #window-bar span {
        font-size: 12px;
        position: relative;
        top: -3px;
      }

      #profile-wrapper {
        display: flex;
        color: white;
        flex-direction: row;
      }
      #status {
        padding-left: 10px;
        padding-top: 8px;
      }
      #status-picker {
        padding-top: 5px;
        font-size: 12px;
      }
      .chevron-down {
        display: inline-block;
        position: relative;
        top: -2px;
        right: -4px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: #cfe6ff transparent transparent transparent;
      }
      #nickname span {
        font-size: 12px;
        padding-left: 10px;
      }
      .muted {
        opacity: 0.7;
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
       this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`<div id="header">
        <div id="window-bar">
            <img src="live_logo.png" alt="">
            <span>Windows Live Messenger</span>
        </div>
        <div id="profile-wrapper">
            <msn-avatar size="62" src="avatars/dog.png"></msn-avatar>  
            <div id="status">
                <div id="nickname">
                    <strong> Kucukkanat </strong> <span class="muted">(busy) <div class="chevron-down"></div><span>
                </div>
                <div id="status-picker">
                    <span  class="muted">stayin' alive</span> <div class="chevron-down"></div>
                </div>
            </div>
        </div>
    </div>`;
    }
}

class MSNAvatar extends LitElement {
    src:string
    size:string
    static properties = {
        src: {type:String},
        size: {type:Number}
    };
    static get styles () {
        const imageSize=94
        return css`
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 120px;
                border-radius: 10px;
                overflow: hidden;
                background-image: url("avatar_frame.png");
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 100% 100%;
            }
            img {
                position: relative;
                left: -2%;
                top: -3%;
                width: 80%;
                height: 80%;
                object-fit: cover;
            }
        `;
    }
    firstUpdated () {
        console.log(this.style)
        this.style.width = this.size + "px"
        this.style.height = this.size + "px"
    }
    render () {
        return html`<img src="${this.src}" alt="" />`;
    }
}

customElements.define('msn-avatar', MSNAvatar);
customElements.define('msn-header', MSNHeader);