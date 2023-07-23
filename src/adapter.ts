export interface Adapter {
  markCompositionUsed: (identifier: string) => void;
}

export const mockAdapter: Adapter = {
  markCompositionUsed: () => {},
};

const adapterStack: Array<Adapter> = [mockAdapter];

const currentAdapter = () => {
  if (adapterStack.length < 1) {
    throw new Error("No adapter configured");
  }

  return adapterStack[adapterStack.length - 1];
};

export const markCompositionUsed: Adapter["markCompositionUsed"] = (
  ...props
) => {
  return currentAdapter().markCompositionUsed(...props);
};
