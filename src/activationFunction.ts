export interface ActivationFunction {
  activate: (x: number) => number;
  derivative: (x: number) => number;
}

export enum ActivationFunctionType {
  LINEAR = 'LINEAR',
  RELU = 'RELU',
  SIGMOID = 'SIGMOID',
  TANH = 'TANH',
}

export type ActivationFunctions = Record<
  ActivationFunctionType,
  ActivationFunction
>;

export const LINEAR: ActivationFunction = {
  activate: (x) => x,
  derivative: () => 1,
};

export const RELU: ActivationFunction = {
  activate: (x) => Math.max(0, x),
  derivative: (x) => (x <= 0 ? 0 : 1),
};

export const SIGMOID: ActivationFunction = {
  activate: (x) => 1 / (1 + Math.exp(-x)),
  derivative: (x) => {
    const output = SIGMOID.activate(x);
    return output * (1 - output);
  },
};

export const TANH: ActivationFunction = {
  activate: (x) => {
    if (x === Infinity) {
      return 1;
    }
    if (x === -Infinity) {
      return -1;
    }
    const e2x = Math.exp(2 * x);
    return (e2x - 1) / (e2x + 1);
  },
  derivative: (x) => {
    const output = TANH.activate(x);
    return 1 - output * output;
  },
};

export const ACTIVATION_FUNCTIONS: ActivationFunctions = {
  LINEAR,
  RELU,
  SIGMOID,
  TANH,
};
