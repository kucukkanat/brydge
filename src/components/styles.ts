import { css } from "lit"


export const common = css`
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
}
.no-select{
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
.text-center {
    text-align: center;
}
.muted {
    opacity: 0.8;
}
.sticky {
    position: sticky;
    top: 0;
}
`;