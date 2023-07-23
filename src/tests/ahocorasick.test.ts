import { AhoCorasick } from "../ahocorasick";

const _s = AhoCorasick.prototype.search;
AhoCorasick.prototype.search = function (string) {
  const results = _s.call(this, string).map(function (result) {
    result.foundStrings = result.foundStrings.sort();
    return result;
  });
  return results;
};

const testCases = [
  {
    keywords: ["hero", "heroic"],
    text: "hero",
    expected: [{ endIndex: 3, foundStrings: ["hero"] }],
  },
  {
    keywords: ["hero", "heroic", "heroism"],
    text: "the hero performed a heroic act of heroism",
    expected: [
      // "hero" is a substring of "heroic" and "heroism", so we should find it 3 times
      { endIndex: 7, foundStrings: ["hero"] },
      { endIndex: 24, foundStrings: ["hero"] },
      { endIndex: 26, foundStrings: ["heroic"] },
      { endIndex: 38, foundStrings: ["hero"] },
      { endIndex: 41, foundStrings: ["heroism"] },
    ],
  },
  {
    keywords: ["keyword1", "keyword2", "etc"],
    text: "should find keyword1 at position 19 and keyword2 at position 30.",
    expected: [
      { endIndex: 19, foundStrings: ["keyword1"] },
      { endIndex: 47, foundStrings: ["keyword2"] },
    ],
  },
  {
    keywords: ["he", "she", "his", "hers"],
    text: "she was expecting his visit",
    expected: [
      { endIndex: 2, foundStrings: ["he", "she"] },
      { endIndex: 20, foundStrings: ["his"] },
    ],
  },
  {
    keywords: ["çp?", "éâà"],
    text: "éâàqwfwéâéeqfwéâàqef àéçp?ẃ wqqryht cp?",
    expected: [
      { endIndex: 2, foundStrings: ["éâà"] },
      { endIndex: 16, foundStrings: ["éâà"] },
      { endIndex: 25, foundStrings: ["çp?"] },
    ],
  },
  {
    keywords: ["**", "666", "his", "n", "\\", "\n"],
    text: "\n & 666 ==! \n",
    expected: [
      { endIndex: 0, foundStrings: ["\n"] },
      // [20, ['his']]
      { endIndex: 6, foundStrings: ["666"] },
      { endIndex: 12, foundStrings: ["\n"] },
    ],
  },
  {
    keywords: ["Федеральной", "ной", "idea"],
    text: "! Федеральной I have no idea what this means.",
    expected: [
      { endIndex: 12, foundStrings: ["Федеральной", "ной"] },
      { endIndex: 27, foundStrings: ["idea"] },
    ],
  },
  {
    keywords: ["bla", "😁", "😀", "😀😁😀"],
    text: "Bla 😁 bla 😀 1 😀 - 😀😁😀-",
    expected: [
      { endIndex: 5, foundStrings: ["😁"] },
      { endIndex: 9, foundStrings: ["bla"] },
      { endIndex: 12, foundStrings: ["😀"] },
      { endIndex: 17, foundStrings: ["😀"] },
      { endIndex: 22, foundStrings: ["😀"] },
      { endIndex: 24, foundStrings: ["😁"] },
      { endIndex: 26, foundStrings: ["😀", "😀😁😀"] },
    ],
  },
  {
    keywords: ["bla", "😁", "😀", "°□°", "w", "┻━┻"],
    text: "-  (╯°□°）╯︵ ┻━┻ ",
    expected: [
      { endIndex: 7, foundStrings: ["°□°"] },
      { endIndex: 14, foundStrings: ["┻━┻"] },
    ],
  },
  {
    keywords: [".com.au", ".com"],
    text: "www.yahoo.com",
    expected: [{ endIndex: 12, foundStrings: [".com"] }],
  },
].map(function (ts) {
  ts.expected = ts.expected.map(function (expected) {
    expected.foundStrings = expected.foundStrings.sort();
    return expected;
  });
  return ts;
});

describe("Aho corasick search", function () {
  testCases.forEach(function (ts) {
    const keys = ts.keywords;
    const text = ts.text;
    const expected = ts.expected;
    it("should test: " + keys.join(", "), function () {
      const aho = new AhoCorasick(keys);
      expect(expected).toStrictEqual(aho.search(text));
    });
  });
});
