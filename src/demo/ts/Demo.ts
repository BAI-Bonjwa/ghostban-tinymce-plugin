import { TinyMCE } from "tinymce";

import Plugin from "../../main/ts/Plugin";

declare let tinymce: TinyMCE;

Plugin();

tinymce.init({
  selector: "textarea.tinymce",
  plugins: "code ghostban-tinymce-plugin",
  toolbar: "ghostban-tinymce-plugin",
  valid_elements: "iframe[!src|width|height|frameborder:0|allowfullscreen]",
  extended_valid_elements:
    "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
});
