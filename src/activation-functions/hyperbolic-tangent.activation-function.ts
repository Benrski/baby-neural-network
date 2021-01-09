import { ActivationFunction } from "./activation-function";

export class HyperbolicTangentActivationFunction implements ActivationFunction {
  private a: number;

  public constructor(a: number = 2) {
    this.a = a;
  }

  public setA(a: number): void {
    this.a = a;
  }

  public getA(): number {
    return this.a;
  }

  public output(x: number): number {
    const ex = Math.exp(this.a * x);
    return (ex - 1) / (ex + 1);
  }

  public derivative(x: number): number {
    return 1 - Math.pow(this.output(x), 2);
  }
}
