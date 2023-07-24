import { StyleRule } from "./types";
import { css } from "./css";

interface StylesheetProps {
  css: StyleRule;
  fixClasses?: boolean;
}

function fixStyleDots(str: string) {
  return str.replace(/\.\\/g, "");
}

export function Stylesheet(props: StylesheetProps) {
  const { css: styleRule, fixClasses = true } = props;

  const styleString = fixClasses
    ? fixStyleDots(css({ styleRule }))
    : css({ styleRule });

  return <style>{styleString}</style>;
}
