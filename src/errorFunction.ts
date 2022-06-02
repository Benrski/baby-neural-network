export interface ErrorFunction {
  error: (output: number, target: number) => number;
  derivative: (output: number, target: number) => number;
}

export enum ErrorFunctionType {
  SQUARE = 'SQUARE',
}

export type ErrorFunctions = Record<ErrorFunctionType, ErrorFunction>;

export const SQUARE: ErrorFunction = {
  error: (output, target) => 0.5 * Math.pow(output - target, 2),
  derivative: (output, target) => output - target,
};

export const ERROR_FUNCTIONS: ErrorFunctions = {
  SQUARE,
};
