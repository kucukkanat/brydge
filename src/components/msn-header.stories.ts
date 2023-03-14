import { html } from "lit";
import "./msn-header";

export default {
  title: "msn-header",
  args: {
    status: "Online",
    nickname: "John Doe",
    statusMessage: "I am a status message",
    listeningTo: "The Beatles - Yesterday",
  },
};
export const Primary = (args) => html`
  <msn-header
    status=${args.status}
    nickname=${args.nickname}
    statusMessage=${args.statusMessage}
  ></msn-header>
`;
