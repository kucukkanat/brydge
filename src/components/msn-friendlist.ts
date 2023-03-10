import { LitElement, html, css, PropertyValueMap } from 'lit';
import { common } from './styles';
import downarrow from "../assets/img/arrow-down.png";
import listenMusic from "../assets/img/listen-music.png"
import "./msn-drawer"
class MSNFriendList extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${common}
    
    #contacts {
      display: block;
      height: calc(100vh - 288px);
      overflow-y: auto;
      border-top: 1px solid #ddd;
      padding: 0 10px;
      cursor: pointer;
      // Disable text select
    }
    ul {
      list-style: none;
      padding-left: 10px;
      margin-top: 5px;
    }
    ul li {
      display: flex;
      align-items: center;
      padding: 5px 0px;
    }
    .arrow {
      width: 10px;
    }
    li span {
      display: inline-block;
      margin: 0px 5px;
    }
    .sticky {
      width: 100%;
      z-index: 2;
      padding: 5px 0px;
      border-bottom: 1px solid #ddd;
    }
    `;
  onlineToggled:boolean
  offlineToggled:boolean
  static properties = {
      onlineToggled: {type:Boolean},
      offlineToggled: {type:Boolean},
  };
    constructor() {
      super();
      this.onlineToggled=false
      this.offlineToggled=false
    }
    
  // Render the UI as a function of component state
  render() {
      return html`<div id="contacts">
        <msn-drawer toggled="true">
          <div slot="handle" style="background: #fff" class="sticky">
            <img class="arrow" src=${downarrow} alt="" /> <strong>Online (4)</strong>
          </div>
          <!-- Online friends -->
          <div slot="content">
            <msn-friendlist-friend status="online" nickname="Merve" listeningTo="Serdat Ortac - Mesafe"></msn-friendlist-friend>
          </div>
        </msn-drawer>

        <msn-drawer>
        <div slot="handle" style="background: #fff" class="sticky">
          <img class="arrow" src=${downarrow} alt="" /> <strong>Offline (4)</strong>
        </div>
        <!-- Offline friends -->
        <div slot="content">
          <msn-friendlist-friend status="busy" nickname="Kahve tiryakisi" statusMessage="Cok mesgulum , lorem ipsum dolor sit amet"></msn-friendlist-friend>
        </div>
        </msn-drawer>
  </div>`;
  }
}

class Friend extends LitElement {
  
  static get styles() {
    return css`
    ${common}
    .status {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :host>div {
      display: flex;
      align-items: center;
    }
    :host>div:active {
      background: #f5f5f5;
    }
    :host>div img {
      width: 20px;
      padding-right: 5px;
    }
    span.status {
      display: inline-block;
      font-size: 12px;
      position: relative;
      bottom: -3px;
    }
    span.separator {
      padding: 0px 5px;
    }
    `;
  }
  status: string;
  nickname: string;
  statusMessage: string;
  listeningTo: string;
  static get properties() {
    return {
      nickname: { type: String },
      status: { type: String },
      statusMessage: { type: String },
      listeningTo: { type: String },
    };
  }
  spotifySearch(){
    return `https://open.spotify.com/search/${encodeURIComponent(this.listeningTo)}`;
  }
  firstUpdated() {
    this.addEventListener("dblclick", (e) => {
      window.location.replace("./chat.html")
    });
  }
   render()  {
    const statusImages:{ [k:string]:string } = {
      'online': 'img/status/online.png',
      'away': 'img/status/away.png',
      'busy': 'img/status/busy.png',
    }
      return html`
        <div>
          <img src="${statusImages[this.status]}" alt="" /> 
          <span class="nickname">${this.nickname} </span> 
          <span class="separator">-</span> 
          ${
            this.listeningTo ? 
            html`<a href=${this.spotifySearch()}><span class="status muted listening-to"> <img src=${listenMusic} />Listening to ${this.listeningTo}</span></a>` : 
            html`<span class="status muted">${this.statusMessage}</span>`
          }
      </div>
      `
  }
}
customElements.define('msn-friendlist', MSNFriendList);
customElements.define('msn-friendlist-friend', Friend);