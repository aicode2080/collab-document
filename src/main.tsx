import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import 'quill/dist/quill.snow.css';
Quill.register('modules/cursors', QuillCursors);
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';

const quill = new Quill('#root', {
  modules: {
    cursors: true,
    toolbar: [
      // adding some basic Quill content features
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true,
    },
  },
  placeholder: 'Start collaborating...',
  theme: 'snow',
});

// Yjs文档，保存共享数据shared data
const ydoc = new Y.Doc();
// 在文档上定义共享文本类型
const ytext = ydoc.getText('quill');
// 创建一个编辑器绑定 将quill编辑器“绑定”到 Y.Text 类型。
// const binding = new QuillBinding(ytext, quill);

const provider = new WebsocketProvider(
  'ws://localhost:1234',
  'quill-demo-room',
  ydoc
);


const binding = new QuillBinding(ytext, quill, provider.awareness)
