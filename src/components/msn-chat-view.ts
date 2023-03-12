import { LitElement,css,html } from "lit";
import {common} from "./styles";

const borderColor = css`#bed6e0`
class Component extends LitElement {
    message: string
    static styles = css`
        ${common}
        :host {
            display: block;
            background-color: #ECF6F9;
        }
        #header {
            background: url(img/backgrounds/chat_header.png);
            height: 80px;
            background-repeat: repeat-x;
            background-size: 100% 100%;
        }
        #header-bar {
            padding: 5px;
            font-size: 12px;
        }
        #header-bar>div:first-child {
            display: flex;
            align-items: center;
            font-weight:bold;
        }
        #header-bar>div:nth-child(2) {
            display: flex;
            align-items: center;
            padding-left:20px;
        }
        #header-bar img:first-child {
            padding-right: 5px;
        }
        #status {
            max-width: 200px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        #user-email {
            padding-left: 10px;
        }
        #chat {
            display: flex;
            flex-direction: row;
        }
        #chat-history {
            height: 250px;
            background-color: #FFF;
            border: 1px solid ${borderColor};
            margin-bottom: 15px;
        }
        #actions-row {
            height: 40px;
            background-color: linear-gradient(to bottom, #fff, blue 50%, black 50%, blue);
            border-bottom: 1px solid ${borderColor};
        }
        #left {
            flex: 1;
        }
        #left,#right{
            padding: 10px;
        }
        #message-input-wrapper {
            border: 1px solid ${borderColor};
        }
        #message-input {
            background-color: #FFF;
            padding: 10px;
        }
        #message-input #message-placeholder {
            font-size: 12px;
        }

    `;

    static get properties() {
        return {
            message: { type: String }
        }
    }
    firstUpdated() {
        const messageInput = this.shadowRoot.getElementById("message-input");
        const messagePlaceholder = this.shadowRoot.getElementById("message-placeholder");
        messageInput.addEventListener("focus", () => {
            messagePlaceholder.style.display = "none";
        });
        messageInput.addEventListener("blur", () => {
            if (messageInput.innerHTML === "") {
                messagePlaceholder.style.display = "block";
            }
        });
        messageInput.addEventListener("keydown", (e) => {
            this.message = messageInput.innerText;
        })
    }
    render() {
        return html`
        <div id="header">
            <div id="header-bar">
                <div>
                <img src="img/talking.png" />
                <span id="chat-username">My friend </span>
                </div>
                <div id="user-status-row" class="muted">
                    <span id="status">Wow, this is so cool =)</span>  <span id="user-email">&lt; <span>maniacology@hotmail.com</span> &gt;</span> 
                </div>
            </div>
            <div>
                <msn-img-button icon="img/invite.png" size="40"></msn-img-button>
                <msn-img-button icon="img/folder.png" size="40"></msn-img-button>
                <msn-img-button icon="img/phone.png" size="40"></msn-img-button>
            </div>
        </div>
        <div id="chat">
            <div id="left">
                <div id="chat-history">

                </div>
                <div id="message-input-wrapper">
                    <div id="actions-row">
                        <msn-img-button icon="img/smiley/smile.png" size="35"></msn-img-button>
                        <msn-img-button icon="img/smiley/wink.gif" size="35"></msn-img-button>
                        <msn-nudge-button></msn-nudge-button>
                        <msn-img-button icon="img/smiley/record.png" size="35"></msn-img-button>
                    </div>
                    <div id="message-input" contenteditable="true">
                        <span id="message-placeholder" class="muted">Type your message here...</span>
                    </div>
                </div>
            </div>
            <div id="right">
                <msn-avatar size="130" src="img/avatars/chef.png"></msn-avatar>
                <msn-avatar size="130" src="img/avatars/executive.png"></msn-avatar>
            </div>
        </div>
        `;
    }

}

customElements.define("msn-chat-view", Component);