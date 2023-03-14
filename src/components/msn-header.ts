import { LitElement, html, css, unsafeCSS } from "lit";
import { common } from "./styles";
import defaultAvatar from "../assets/img/avatars/dog.png";
import headerBackground from "../assets/img/backgrounds/background-large.png";
import live from "../assets/img/live_logo.png";
class MSNHeader extends LitElement {
  nickname: string;
  status: string;
  statusMessage: string;
  avatar: string;
  static properties = {
    nickname: { type: String },
    status: { type: String },
    statusMessage: { type: String },
    avatar: { type: String },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${common}
    :host {
      display: block;
      height: 100px;
      padding-left: 10px;
      padding-top: 5px;
      background-image: url(${unsafeCSS(headerBackground)});
      background-size: 100% 100%;
    }

    #window-bar {
      color: white;
      padding-bottom: 5px;
    }
    #window-bar span,
    #window-bar img {
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
  }

  // Render the UI as a function of component state
  render() {
    return html`<div id="header" class="no-select">
  <div id="window-bar">
    <img src=${live} alt="">
    <span>Windows Live Messenger</span>
  </div>
  <div id="profile-wrapper">
    <msn-avatar size="62" src=${this.avatar || defaultAvatar}></msn-avatar>
    <div id="status">
      <div id="nickname">
        <strong> ${this.nickname} </strong> <span class="muted">(${
      this.status
    }) <div class="chevron-down"></div><span>
      </div>
      <div id="status-picker">
        <span class="muted">${this.statusMessage}</span>
        <div class="chevron-down"></div>
      </div>
    </div>
  </div>
</div>`;
  }
}

customElements.define("msn-header", MSNHeader);
