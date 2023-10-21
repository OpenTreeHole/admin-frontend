"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  default: () => refina
});
module.exports = __toCommonJS(plugin_exports);
var import_magic_string = __toESM(require("magic-string"), 1);
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
      const s = new import_magic_string.default(code);
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
//# sourceMappingURL=plugin.cjs.map