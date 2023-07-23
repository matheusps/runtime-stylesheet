export class AhoCorasick {
  private gotoFn: Record<number, any> = {
    0: {},
  };
  private output: Record<number, any> = {};
  private failure: Record<number, any> = {};

  constructor(keywords: Array<string>) {
    this.buildFsm(keywords);
  }

  /**
   * Creates the FSM (Finite State Machine) using the keywords
   * @param keywords: Array of strings
   * @link https://developer.mozilla.org/en-US/docs/Glossary/State_machine
   */
  private buildFsm(keywords: Array<string>) {
    let state = 0;
    const xs = []; // discover what this is

    keywords.forEach((word) => {
      let curr = 0;
      for (let i = 0; i < word.length; i++) {
        const l = word[i];
        if (this.gotoFn[curr] && l in this.gotoFn[curr]) {
          curr = this.gotoFn[curr][l];
        } else {
          state++;
          this.gotoFn[curr][l] = state;
          this.gotoFn[state] = {};
          curr = state;
          this.output[state] = [];
        }
      }

      this.output[curr].push(word);
    });

    // f(s) = 0 for all states of depth 1 (the ones from which the 0 state can transition to)
    for (const l in this.gotoFn[0]) {
      const innerState = this.gotoFn[0][l];
      this.failure[innerState] = 0;
      xs.push(innerState);
    }

    while (xs.length) {
      const r = xs.shift();
      // for each symbol a such that g(r, a) = s
      for (const l in this.gotoFn[r]) {
        const s: any = this.gotoFn[r][l];
        xs.push(s);

        // set state = f(r)
        let state = this.failure[r];
        while (state > 0 && !(l in this.gotoFn[state])) {
          state = this.failure[state];
        }

        if (l in this.gotoFn[state]) {
          const fs = this.gotoFn[state][l];
          this.failure[s] = fs;
          this.output[s] = this.output[s].concat(this.output[fs]);
        } else {
          this.failure[s] = 0;
        }
      }
    }
  }

  public search(str: string): SearchReturn {
    let currentState = 0;
    const results: Array<SearchResult> = [];

    for (let i = 0; i < str.length; i++) {
      const l = str[i];
      while (currentState > 0 && !(l in this.gotoFn[currentState])) {
        currentState = this.failure[currentState];
      }
      if (!(l in this.gotoFn[currentState])) {
        continue;
      }

      currentState = this.gotoFn[currentState][l];

      if (this.output[currentState].length) {
        const foundStrings = this.output[currentState];
        results.push({ endIndex: i, foundStrings });
      }
    }

    return results;
  }
}

interface SearchResult {
  endIndex: number;
  foundStrings: Array<string>;
}

type SearchReturn = Array<SearchResult>;
