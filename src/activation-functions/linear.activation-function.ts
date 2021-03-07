import { ActivationFunction } from "./activation-function";

export class LinearActivationFunction implements ActivationFunction {
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
    return x;
  }

  public derivative(x: number): number {
    return this.a;
  }

  public clone(): ActivationFunction {
    return new LinearActivationFunction(this.a);
  }
}
