import {html} from "lit"
import "./msn-avatar"
import avatar from "../assets/img/avatars/guitar.png"
export default {
    title: 'msn-button'
}

export const MSNAvatar = () => html`<msn-avatar src="${avatar}"></msn-avatar>`
