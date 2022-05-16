import { Editor, TinyMCE } from "tinymce";

declare const tinymce: TinyMCE;

// const setup = (editor: Editor, url: string): void => {
const setup = (editor: Editor): void => {
  editor.ui.registry.addButton("ghostban-tinymce-plugin", {
    text: "Go",
    onAction: () => {
      // editor.setContent(
      //   "<p>hhh`【content added from ghostban-tinymce-plugin</p>"
      // );
      return editor.windowManager.open({
        title: "Embed Go/Weiqi/Baduk",
        body: {
          type: "panel",
          items: [
            {
              type: "input",
              name: "share_url",
              label: "Share URL(required)",
            },
            {
              type: "listbox", // component type
              name: "type", // identifier
              label: "Board Type", // text for the label
              items: [
                { text: "Simple", value: "si" },
                { text: "Standard", value: "st" },
                // { text: "Advanced", value: "ad" },
              ],
            },
            {
              type: "input",
              name: "title",
              label:
                "Title(optional, only visible in standard and advanced mode)",
            },
            {
              type: "htmlpanel", // A HTML panel component
              html: "",
            },
          ],
        },
        buttons: [
          {
            type: "cancel",
            text: "Close",
          },
          {
            type: "submit",
            text: "Insert",
            primary: true,
          },
        ],
        onSubmit: function (api) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = api.getData();
          let url = data.share_url;
          let width = 320;
          let height = 350;
          if (data.title) {
            url += `&t=${data.title}`;
          }

          if (data.type) {
            url += `&k=${data.type}`;
          }

          if (data.type === "st" || data.type === "ad") {
            width = 640;
            height = 360;
          }

          if (data.type === "ad") {
            width = 680;
            height = 360;
          }

          editor.insertContent(
            `<div><iframe frameborder="0" scrolling="no" width="${width}" height="${height}" src="${url}"></iframe></div>`
          );
          api.close();
        },
      });
    },
  });
};

export default (): void => {
  tinymce.PluginManager.add("ghostban-tinymce-plugin", setup);
};
