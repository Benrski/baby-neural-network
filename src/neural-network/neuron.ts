import { ActivationFunction } from "../activation-functions/activation-function";
import { Layer } from "./layers/layer";

export interface NeuronOptions {
  activationFunction: ActivationFunction;
  inputsCount: number;
  layer: Layer;
}

export class Neuron {
  protected inputsCount: number;
  protected inputs: number[] = [];
  protected weights: number[] = [];
  protected bias: number = 1;
  protected biasWeight: number = 0.5;
  protected output: number = NaN;
  protected outputDerivative: number = NaN;
  protected layer: Layer;
  protected activationFunction: ActivationFunction;

  public constructor({
    activationFunction,
    inputsCount,
    layer,
  }: NeuronOptions) {
    this.activationFunction = activationFunction;
    this.inputsCount = inputsCount;
    this.layer = layer;
  }

  public initialize() {
    this.inputs = [];
    this.weights = [];
    for (let i = 0; i < this.inputsCount; i++) {
      this.weights.push(Math.random() - 0.5);
    }
    this.biasWeight = 0.1;
    this.output = NaN;
    this.outputDerivative = NaN;
  }

  public setInputsCount(inputsCount: number): void {
    this.inputsCount = inputsCount;
  }

  public getInputsCount(): number {
    return this.inputsCount;
  }

  public setInputs(inputs: number[]): void {
    this.inputs = inputs;
  }

  public getInputs(): number[] {
    return this.inputs;
  }

  public setInput(index: number, input: number): void {
    this.inputs[index] = input;
  }

  public getInput(index: number): number {
    return this.inputs[index];
  }

  public setWeights(weights: number[]): void {
    this.weights = weights;
  }

  public getWeights(): number[] {
    return this.weights;
  }

  public setWeight(index: number, weight: number): void {
    this.weights[index] = weight;
  }

  public getWeight(index: number): number {
    return this.weights[index];
  }

  public setBias(bias: number): void {
    this.bias = bias;
  }

  public getBias(): number {
    return this.bias;
  }

  public setBiasWeight(biasWeight: number): void {
    this.biasWeight = biasWeight;
  }

  public getBiasWeight(): number {
    return this.biasWeight;
  }

  public setLayer(layer: Layer): void {
    this.layer = layer;
  }

  public getLayer(): Layer {
    return this.layer;
  }

  public setActivationFunction(activationFunction: ActivationFunction): void {
    this.activationFunction = activationFunction;
  }

  public getActivationFunction(): ActivationFunction {
    return this.activationFunction;
  }

  public getOutput(): number {
    return this.output;
  }

  public getOutputDerivative(): number {
    return this.outputDerivative;
  }

  public calculate(derivative: boolean = false): void {
    let outputBeforeActivation = 0;
    for (let i = 0; i < this.inputsCount; i++) {
      outputBeforeActivation += this.inputs[i] * this.weights[i];
    }
    outputBeforeActivation += this.bias * this.biasWeight;
    this.output = this.activationFunction.output(outputBeforeActivation);
    if (derivative) {
      this.outputDerivative = this.activationFunction.derivative(
        outputBeforeActivation
      );
    }
  }
}
