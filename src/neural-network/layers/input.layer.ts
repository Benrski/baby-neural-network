import { LinearActivationFunction } from "../../activation-functions/linear.activation-function";
import { NeuralNetwork } from "../neural-network";
import { Neuron } from "../neuron";
import { Layer } from "./layer";

export interface InputLayerOptions {
  inputsCount: number;
  neuralNetwork: NeuralNetwork;
}

export class InputLayer extends Layer {
  public constructor({ inputsCount, neuralNetwork }: InputLayerOptions) {
    super({
      activationFunction: new LinearActivationFunction(),
      inputsCount: inputsCount,
      neuralNetwork: neuralNetwork,
      neuronsCount: inputsCount,
    });
  }

  public setNeuronsCount(neuronsCount: number): void {
    this.neuronsCount = neuronsCount;
    this.inputsCount = neuronsCount;
  }

  public setInputsCount(inputsCount: number): void {
    this.inputsCount = inputsCount;
    this.neuronsCount = inputsCount;
  }

  public initialize() {
    this.neurons = [];
    this.inputs = [];
    this.outputs = [];
    for (let i = 0; i < this.inputsCount; i++) {
      const neuron = new Neuron({
        activationFunction: this.activationFunction,
        inputsCount: 1,
        layer: this,
      });
      neuron.setWeights([1]);
      neuron.setBias(0);
      neuron.setBiasWeight(0);
      this.neurons.push(neuron);
    }
  }

  public setPreviousLayer(previousNeuralLayer?: Layer): void {
    this.previousLayer = undefined;
  }

  public setNextLayer(nextNeuralLayer?: Layer): void {
    this.nextLayer = nextNeuralLayer;
    if (this.nextLayer && this.nextLayer.getPreviousLayer() !== this) {
      this.nextLayer.setPreviousLayer(this);
    }
  }

  public calculate(derivative: boolean = false): void {
    for (let i = 0; i < this.inputsCount; i++) {
      this.neurons[i].setInputs([this.inputs[i]]);
      this.neurons[i].calculate();
      this.outputs[i] = this.neurons[i].getOutput();
    }
  }
}
