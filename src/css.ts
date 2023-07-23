import { transformCss } from "./transform-css";
import { CSS } from "./types";

export function css(object: any = {}): string {
  const classNames = Object.keys(object);

  const cssObjs: CSS[] = [];

  for (const className in object) {
    const cssObject: CSS = {
      type: "local",
      selector: className,
      rule: object[className],
    };

    cssObjs.push(cssObject);
  }

  return transformCss({
    localClassNames: classNames,
    cssObjs,
  }).join("\n");
}
