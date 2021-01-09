import { ActivationFunction } from "../../activation-functions/activation-function";
import { NeuralNetwork } from "../neural-network";
import { Neuron } from "../neuron";

export interface LayerOptions {
  activationFunction: ActivationFunction;
  inputsCount: number;
  neuralNetwork: NeuralNetwork;
  neuronsCount: number;
}

export class Layer {
  protected neuronsCount: number;
  protected neurons: Neuron[] = [];
  protected inputsCount: number;
  protected inputs: number[] = [];
  protected outputs: number[] = [];
  protected activationFunction: ActivationFunction;
  protected neuralNetwork: NeuralNetwork;
  protected previousLayer?: Layer;
  protected nextLayer?: Layer;

  public constructor({
    activationFunction,
    inputsCount,
    neuronsCount,
    neuralNetwork,
  }: LayerOptions) {
    this.activationFunction = activationFunction;
    this.inputsCount = inputsCount;
    this.neuronsCount = neuronsCount;
    this.neuralNetwork = neuralNetwork;
  }

  public initialize() {
    this.neurons = [];
    this.inputs = [];
    this.outputs = [];
    for (let i = 0; i < this.neuronsCount; i++) {
      const neuron = new Neuron({
        activationFunction: this.activationFunction,
        inputsCount: this.inputsCount,
        layer: this,
      });
      neuron.initialize();
      this.neurons.push(neuron);
    }
  }

  public setNeuronsCount(neuronsCount: number): void {
    this.neuronsCount = neuronsCount;
  }

  public getNeuronsCount(): number {
    return this.neuronsCount;
  }

  public setNeurons(neurons: Neuron[]): void {
    this.neurons = neurons;
  }

  public getNeurons(): Neuron[] {
    return this.neurons;
  }

  public setNeuron(neuron: Neuron, index: number): void {
    this.neurons[index] = neuron;
  }

  public getNeuron(index: number): Neuron {
    return this.neurons[index];
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

  public setInput(input: number, index: number): void {
    this.inputs[index] = input;
  }

  public getInput(index: number): number {
    return this.inputs[index];
  }

  public getOutputsCount(): number {
    return this.neuronsCount;
  }

  public getOutputs(): number[] {
    return this.outputs;
  }

  public getOutput(index: number): number {
    return this.outputs[index];
  }

  public setActivationFunction(activationFunction: ActivationFunction): void {
    this.activationFunction = activationFunction;
  }

  public getActivationFunction(): ActivationFunction {
    return this.activationFunction;
  }

  public setPreviousLayer(previousLayer?: Layer): void {
    this.previousLayer = previousLayer;
  }

  public getPreviousLayer(): Layer | undefined {
    return this.previousLayer;
  }

  public setNextLayer(nextLayer?: Layer): void {
    this.nextLayer = nextLayer;
  }

  public getNextLayer(): Layer | undefined {
    return this.nextLayer;
  }

  public setNeuralNetwork(neuralNetwork: NeuralNetwork): void {
    this.neuralNetwork = neuralNetwork;
  }

  public getNeuralNetwork(): NeuralNetwork {
    return this.neuralNetwork;
  }

  public calculate(derivative: boolean = false): void {
    for (let i = 0; i < this.neuronsCount; i++) {
      this.neurons[i].setInputs(this.inputs);
      this.neurons[i].calculate(derivative);
      this.outputs[i] = this.neurons[i].getOutput();
    }
  }
}
