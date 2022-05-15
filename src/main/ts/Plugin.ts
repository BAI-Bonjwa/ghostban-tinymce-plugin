import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('ghostban-tinymce-plugin', {
    text: 'ghostban-tinymce-plugin button',
    onAction: () => {
      editor.setContent('<p>content added from ghostban-tinymce-plugin</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('ghostban-tinymce-plugin', setup);
};
