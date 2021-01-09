export interface ActivationFunction {
  output(x: number): number;

  derivative(x: number): number;
}
