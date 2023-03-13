import {html} from "lit"
import "./msn-chat-message"

export default {
    title: 'msn-chat-message',
    argTypes: {
        from : {control:'text'},
        message : {control:'text'}
    }
}

export const Primary = (args) => html`<msn-chat-message from=${args.from || 'Dark Prince 666'} message="Hello world"></msn-chat-message>`

