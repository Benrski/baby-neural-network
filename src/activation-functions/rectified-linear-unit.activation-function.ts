import { ActivationFunction } from "./activation-function";

export class RectifiedLinearUnitActivationFunction
  implements ActivationFunction {
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
    return Math.max(0, this.a * x);
  }

  public derivative(x: number): number {
    return x <= 0 ? 0 : this.a;
  }
}
