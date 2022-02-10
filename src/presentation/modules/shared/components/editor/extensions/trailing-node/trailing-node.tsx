import { Extension } from "@tiptap/core";
import { last } from "lodash";
import { PluginKey, Plugin } from "prosemirror-state";

export interface TrailingNodeExtensionOptions {
  node: string;
  notAfter: Array<string>;
}

function nodeEqualsType({ types, node }: { types: any; node: any }) {
  return (
    (Array.isArray(types) && types.includes(node.type)) || node.type === types
  );
}

export const TrailingNode = Extension.create<TrailingNodeExtensionOptions>({
  name: "trailingNode",

  defaultOptions: {
    node: "br",
    notAfter: [],
  },

  addProseMirrorPlugins() {
    const plugin = new PluginKey(this.name);
    const disabledNodes = Object.entries(this.editor.schema.nodes)
      .map(([, value]) => value)
      .filter((node) => this.options.notAfter.includes(node.name));

    return [
      new Plugin({
        key: plugin,
        appendTransaction: (_, __, state) => {
          const { doc, tr, schema } = state;
          const shouldInsertNodeAtEnd = plugin.getState(state);
          const endPosition = doc.content.size;
          const type = schema.nodes[this.options.node];

          const isEmpty = !Boolean(
            //@ts-ignore
            doc.content.content[doc.content.content.length - 1].content.size
          );
          if (!shouldInsertNodeAtEnd || isEmpty) {
            return;
          }
          //remove all previous

          return tr.insert(endPosition, type.create());
        },
        state: {
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
          apply: (tr, value) => {
            if (!tr.docChanged) {
              return value;
            }

            const lastNode = tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
        },
      }),
    ];
  },
});
