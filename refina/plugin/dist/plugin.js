// plugin.ts
import MagicString from "magic-string";
function refina() {
  const ctx = { lastFileId: 0, fileIds: /* @__PURE__ */ new Map() };
  return {
    name: "refina-plugin",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".r.ts")) {
        return null;
      }
      let fileId = ctx.fileIds.get(id);
      if (fileId === void 0) {
        fileId = ctx.lastFileId.toString(36).toUpperCase();
        ctx.lastFileId++;
        ctx.fileIds.set(id, fileId);
        console.log("file", fileId, "is", id);
      }
      let lastKey = 0;
      const getKey = () => `${fileId}-${lastKey.toString(36).toUpperCase()}`;
      const s = new MagicString(code);
      s.replaceAll(/_\s*\.\s*t\s*`(.*?)`/g, (_, text) => {
        lastKey++;
        return `_.$$t("${getKey()}", \`${text}\`)`;
      });
      s.replaceAll(/_\s*\.\s*([a-zA-Z0-9_]+)\s*\(/g, (_, name) => {
        lastKey++;
        return name === "t" ? `_.$$t("${getKey()}",` : `_.$$("${name}", "${getKey()}",`;
      });
      s.replaceAll(
        /_\s*\.\s*([a-zA-Z0-9_]+)\s*\<([\s\S]+?)\>\s*\(/g,
        (_, name, targs) => {
          lastKey++;
          return `_.$$("${name}", "${getKey()}",`;
        }
      );
      const map = s.generateMap({
        source: id,
        file: id + ".map",
        includeContent: true
      });
      return {
        code: s.toString(),
        map
      };
    }
  };
}
export {
  refina as default
};
//# sourceMappingURL=plugin.js.map