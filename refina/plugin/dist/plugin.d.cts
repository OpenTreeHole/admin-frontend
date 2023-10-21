import * as magic_string from 'magic-string';
import * as rollup from 'rollup';

declare function refina(): {
    name: string;
    enforce: "pre";
    transform(this: rollup.TransformPluginContext, code: string, id: string): {
        code: string;
        map: magic_string.SourceMap;
    } | null;
};

export { refina as default };
