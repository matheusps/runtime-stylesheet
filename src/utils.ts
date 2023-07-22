/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ClassNames } from "./types";

type BasicObj = { [key: string]: any };

export function get(obj: any, path: Array<string>) {
  let result = obj;

  for (const key of path) {
    if (!(key in result)) {
      throw new Error(`Path ${path.join(" -> ")} does not exist in object`);
    }
    result = result[key];
  }

  return result;
}

export function getVarName(variable: string) {
  const matches = variable.match(/^var\((.*)\)$/);

  if (matches) {
    return matches[1];
  }

  return variable;
}

export function forEach<Input extends BasicObj>(
  obj: Input | undefined,
  fn: <Key extends keyof Input>(value: Input[Key], key: string) => void
) {
  for (const key in obj) {
    fn(obj[key], key);
  }
}

export function omit<Input extends BasicObj, OmitKey extends string>(
  obj: Input | undefined,
  omitKeys: Array<OmitKey>
): Omit<Input, OmitKey> {
  const result: any = {};

  for (const key in obj) {
    if (omitKeys.indexOf(key as any) === -1) {
      result[key] = obj[key];
    }
  }

  return result;
}

export function mapKeys<Input extends BasicObj>(
  obj: Input | undefined,
  fn: <Key extends keyof Input>(value: Input[Key], key: string) => string
): Record<string, Input[keyof Input]> {
  const result: any = {};

  for (const key in obj) {
    result[fn(obj[key], key)] = obj[key];
  }

  return result;
}

export function isEqual(a: any, b: any) {
  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === "object") {
    const keys1 = Object.keys(a);
    const keys2 = Object.keys(b);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key in a) {
      if (!isEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  } else {
    return a === b;
  }
}

function composeStylesIntoSet(
  set: Set<string>,
  ...classNames: Array<ClassNames>
) {
  for (const className of classNames) {
    if (className.length === 0) {
      continue;
    }

    if (typeof className === "string") {
      if (className.includes(" ")) {
        composeStylesIntoSet(set, ...className.trim().split(" "));
      } else {
        set.add(className);
      }
    } else if (Array.isArray(className)) {
      composeStylesIntoSet(set, ...className);
    }
  }
}

export function dudupeAndJoinClassList(classNames: Array<ClassNames>) {
  const set: Set<string> = new Set();

  composeStylesIntoSet(set, ...classNames);

  return Array.from(set).join(" ");
}
