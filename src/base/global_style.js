import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&subset=cyrillic');

    html {
        line-height: 1.2;
        -webkit-text-size-adjust: 100%;
    }

    body {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        margin: 0;
        background: #0079bf;
        color: #4d4d4d;
    }
    body *{
        box-sizing:border-box;
    }
    textarea,
    input,
    button,
    select {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        outline: none;
        color: #171717;
    }

    main {
        display: block;
    }

    h1 {
        font-size: 24px;
        margin: 0;
    }

    p {
        margin: 0;
    }

    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    pre {
        font-family: monospace, monospace;
        font-size: 14px;
    }

    a {
        background-color: transparent;
        text-decoration: none;
        color: #171717;
    }

    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        text-decoration: underline dotted;
    }

    b,
    strong {
        font-weight: bolder;
    }

    code,
    kbd,
    samp {
        font-family: monospace, monospace;
        font-size: 14px;
    }

    small {
        font-size: 80%;
    }

    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    img {
        border-style: none;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.2;
        margin: 0;
    }

    button,
    input {
        overflow: visible;
    }

    button,
    select {
        text-transform: none;
    }

    button,
    [type='button'],
    [type='reset'],
    [type='submit'] {
        -webkit-appearance: button;
        background:#fff;
        border:1px solid #ddd;
        padding:5px 15px;
        border-radius:5px;
    }

    button::-moz-focus-inner,
    [type='button']::-moz-focus-inner,
    [type='reset']::-moz-focus-inner,
    [type='submit']::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    button:-moz-focusring,
    [type='button']:-moz-focusring,
    [type='reset']:-moz-focusring,
    [type='submit']:-moz-focusring {
        outline: 1px dotted ButtonText;
    }

    fieldset {
        padding: 0.35em 0.75em 0.625em;
    }

    legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
    }

    progress {
        vertical-align: baseline;
    }

    textarea {
        overflow: auto;
    }

    [type='checkbox'],
    [type='radio'] {
        box-sizing: border-box;
        padding: 0;
    }

    [type='number']::-webkit-inner-spin-button,
    [type='number']::-webkit-outer-spin-button {
        height: auto;
    }

    [type='search'] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
    }

    [type='search']::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }

    details {
        display: block;
    }

    summary {
        display: list-item;
    }

    template {
        display: none;
    }

    [hidden] {
        display: none;
    }
    .panel {
        width: 100%;
        height: 100%;
        margin: 0 0 25px;
        overflow: hidden;
        position:relative;
        padding: 10px 0px 27px 20px;
        background: #e0e0e0;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        border-radius: 3px;
    }
    .panel__header {
        font-weight: bold;
        padding: 0 0 10px;
    }
    .panel__items {
        overflow-y: auto;
        min-height:50px;
        height:100%;
        width:100%;
    }
    .item {
        background: #fff;
        border-radius: 4px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        margin: 0 15px 25px 0;
        
    }
    .gu-transit{
        opacity:0.7;
        
    }
    .item__header {
        padding: 5px 10px 3px;
        font-weight: bold;
        border-bottom: 1px solid #e0e0e0;
        cursor:move;
    }
    .item__body {
        padding: 13px 10px;
    }
    .item__footer {
        padding: 5px 10px;
        height:31px;
        font-weight: bold;
        border-top: 1px solid #e0e0e0;
    }
    .item__edit{
        width: 20px;
        height: 20px;
        border-radius: 20px;
        border: 1px solid #ddd;
        font-size:14px;
        line-height:20px;
        text-align:center;
        background:#eee;
        color:#000;
        float:right;
        cursor:pointer;
    }
    .item__remove{
        width: 20px;
        height: 20px;
        border-radius: 20px;
        border: 1px solid #ddd;
        font-size:16px;
        line-height:20px;
        text-align:center;
        background:#eee;
        color:#000;
        float:left;
        cursor:pointer;
    }
    [draggable] {
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        /* Required to make elements draggable in old WebKit */
        -khtml-user-drag: element;
        -webkit-user-drag: element;
      }
`
