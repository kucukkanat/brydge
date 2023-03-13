import { css, html, LitElement, unsafeCSS } from "lit";
import avatarframe from "../assets/img/avatar_frame.png";
class MSNAvatar extends LitElement {
    src: string
    size: string
    static properties = {
        src: { type: String },
        size: { type: Number }
    };
    static get styles() {
        const imageSize = 94
        return css`
              :host {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 120px;
                  height: 120px;
                  border-radius: 10px;
                  overflow: hidden;
                  background-image: url(${unsafeCSS(avatarframe)});
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
    firstUpdated() {
        this.style.width = this.size + "px"
        this.style.height = this.size + "px"
    }
    render() {
        return html`<img src="${this.src}" alt="" />`;
    }
}

customElements.define('msn-avatar', MSNAvatar);