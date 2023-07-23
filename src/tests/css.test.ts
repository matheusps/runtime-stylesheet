import { css } from "../css";

function withoutSpaces(str: string) {
  return str.replace(/\s/g, "");
}

test("should accept css object", () => {
  const result = withoutSpaces(
    css({
      test: {
        background: "black",
        ":hover": {
          background: "pink",
        },
      },
    })
  );

  const testCase = withoutSpaces(
    `.test { background: black; } .test:hover { background: pink; }`
  );

  expect(result).toEqual(testCase);
});
