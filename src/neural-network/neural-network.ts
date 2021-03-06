import { ActivationFunction } from "../activation-functions/activation-function";
import { HiddenLayer } from "./layers/hidden.layer";
import { InputLayer } from "./layers/input.layer";
import { Layer } from "./layers/layer";
import { OutputLayer } from "./layers/output.layer";

export interface NeuralNetworkOptions {
  inputsCount: number;
  hiddenOptions?: Array<{
    hiddenFunction: ActivationFunction;
    neuronsCount: number;
  }>;
  outputFunction: ActivationFunction;
  outputsCount: number;
  initialize?: boolean;
}

export class NeuralNetwork {
  protected inputLayer: Layer;
  protected hiddenLayers: Layer[] = [];
  protected outputLayer: Layer;
  protected inputsCount: number;
  protected inputs: number[] = [];
  protected outputsCount: number;
  protected outputs: number[] = [];

  public constructor({
    inputsCount,
    hiddenOptions,
    outputFunction,
    outputsCount,
    initialize = true,
  }: NeuralNetworkOptions) {
    this.inputsCount = inputsCount;
    const inputLayer = new InputLayer({
      inputsCount: this.inputsCount,
      neuralNetwork: this,
    });
    this.inputLayer = inputLayer;
    let previousLayer = inputLayer;
    if (hiddenOptions) {
      for (const hiddenOption of hiddenOptions) {
        const hiddenLayer = new HiddenLayer({
          activationFunction: hiddenOption.hiddenFunction,
          inputsCount: previousLayer.getNeuronsCount(),
          neuronsCount: hiddenOption.neuronsCount,
          neuralNetwork: this,
        });
        hiddenLayer.setPreviousLayer(previousLayer);
        this.hiddenLayers.push(hiddenLayer);
        previousLayer = hiddenLayer;
      }
    }
    this.outputsCount = outputsCount;
    const outputLayer = new OutputLayer({
      activationFunction: outputFunction,
      inputsCount: previousLayer.getNeuronsCount(),
      neuronsCount: this.outputsCount,
      neuralNetwork: this,
    });
    outputLayer.setPreviousLayer(previousLayer);
    this.outputLayer = outputLayer;
    if (initialize) {
      this.initialize();
    }
  }

  public initialize() {
    this.inputs = [];
    this.outputs = [];
    this.inputLayer.initialize();
    for (const hiddenLayer of this.hiddenLayers) {
      hiddenLayer.initialize();
    }
    this.outputLayer.initialize();
  }

  public getInputLayer(): Layer {
    return this.inputLayer;
  }

  public getHiddenLayers(): Layer[] {
    return this.hiddenLayers;
  }

  public getOutputLayer(): Layer {
    return this.outputLayer;
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

  public setInput(input: number, index: number): void {
    this.inputs[index] = input;
  }

  public getInput(index: number): number {
    return this.inputs[index];
  }

  public getOutputsCount(): number {
    return this.outputsCount;
  }

  public getOutputs(): number[] {
    return this.outputs;
  }

  public getOutput(index: number): number {
    return this.outputs[index];
  }

  public calculate(derivative: boolean = false): void {
    let currentLayer = this.inputLayer;
    let nextLayer = currentLayer.getNextLayer();
    currentLayer.setInputs(this.inputs);
    currentLayer.calculate();
    while (nextLayer) {
      nextLayer.setInputs(currentLayer.getOutputs());
      nextLayer.calculate(derivative);
      currentLayer = nextLayer;
      nextLayer = currentLayer.getNextLayer();
    }
    this.outputs = currentLayer.getOutputs();
  }
}
