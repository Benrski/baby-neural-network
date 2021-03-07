import { ActivationFunction } from "./activation-function";

export class SigmoidActivationFunction implements ActivationFunction {
  private a: number;

  public constructor(a: number = 1) {
    this.a = a;
  }

  public setA(a: number): void {
    this.a = a;
  }

  public getA(): number {
    return this.a;
  }

  public output(x: number): number {
    return 1 / (1 + Math.exp(-this.a * x));
  }

  public derivative(x: number): number {
    const output = this.output(x);
    return output * (1 - output);
  }

  public clone(): ActivationFunction {
    return new SigmoidActivationFunction(this.a);
  }
}
