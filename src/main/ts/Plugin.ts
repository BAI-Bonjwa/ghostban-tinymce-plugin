import { Editor, TinyMCE } from "tinymce";

declare const tinymce: TinyMCE;

// const setup = (editor: Editor, url: string): void => {
const setup = (editor: Editor): void => {
  tinymce.addI18n("zh_CN", {
    "Board Type": "棋盘类型",
    Simple: "简洁",
    Basic: "基本",
    Standard: "标准",
    Small: "小尺寸",
    Medium: "中尺寸",
    Large: "大尺寸",
    Size: "嵌入尺寸",
    "Embed Go/Weiqi/Baduk": "嵌入棋盘",
    "Embed URL(required, can be generated from the editor page)":
      "嵌入 URL（必填, 可在在线编辑器页面编辑棋谱后生成）",
    "Title(optional, only visible in standard and advanced mode)":
      "标题（可选，仅标准模式可见）",
  });
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
              name: "embed_url",
              label:
                "Embed URL(required, can be generated from the editor page)",
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
              type: "listbox", // component type
              name: "size", // identifier
              label: "Size", // text for the label
              items: [
                { text: "Small", value: "sm" },
                { text: "Medium", value: "md" },
                { text: "Large", value: "lg" },
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
        initialData: {
          size: "lg",
          simple: "st",
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
          let url = data.embed_url;
          [];

          const size = {
            si: {
              sm: { width: 350, height: 380 },
              md: { width: 450, height: 492 },
              lg: { width: 600, height: 656 },
            },
            st: {
              sm: { width: 685, height: 350 },
              md: { width: 785, height: 450 },
              lg: { width: 900, height: 560 },
            },
          };

          if (data.title) {
            url += `&t=${data.title}`;
          }

          if (data.type) {
            url += `&k=${data.type}`;
          }

          if (data.size) {
            url += `&s=${data.size}`;
          }

          editor.insertContent(
            `<div><iframe frameborder="0" scrolling="no" width="${
              size[data.type][data.size].width
            }" height="${
              size[data.type][data.size].height
            }" src="${url}"></iframe></div>`
          );
          api.close();
        },
      });
    },
  });
};

export default (): void => {
  tinymce.PluginManager.add("ghostban-tinymce-plugin", setup);
  // tinymce.PluginManager.requireLangPack("ghostban-tinymce-plugin", "zh_CN");
};
