import { ActivationFunction } from "../activation-functions/activation-function";
import { HiddenLayer } from "./layers/hidden.layer";
import { InputLayer } from "./layers/input.layer";
import { Layer } from "./layers/layer";
import { OutputLayer } from "./layers/output.layer";

interface HiddenOptions {
  hiddenFunction: ActivationFunction;
  neuronsCount: number;
}

export interface NeuralNetworkOptions {
  inputsCount: number;
  hiddenOptions?: Array<HiddenOptions>;
  outputFunction: ActivationFunction;
  outputsCount: number;
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
    this.initialize();
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
    this.inputs[index + 1] = input;
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

  public clone(): NeuralNetwork {
    // Cloning hidden layers and neural network options
    let hiddenOptions: Array<HiddenOptions> | undefined;
    if (this.hiddenLayers.length > 0) {
      hiddenOptions = [];
      for (const hiddenLayer of this.hiddenLayers) {
        const neuronsCount = hiddenLayer.getNeuronsCount();
        const hiddenFunction = hiddenLayer.getActivationFunction().clone();
        hiddenOptions.push({ neuronsCount, hiddenFunction });
      }
    }
    const options: NeuralNetworkOptions = {
      inputsCount: this.inputsCount,
      outputsCount: this.outputsCount,
      hiddenOptions: hiddenOptions,
      outputFunction: this.outputLayer.getActivationFunction().clone(),
    };

    // Initializing neural network structure
    const neuralNetwork = new NeuralNetwork(options);

    // Cloning input layer
    for (let n = 0; n < this.inputLayer.getNeuronsCount(); n++) {
      const neuronToCopy = this.inputLayer.getNeuron(n);
      const weightsToCopy = neuronToCopy.getWeights();
      const neuron = neuralNetwork.inputLayer.getNeuron(n);
      neuron.setWeights([...weightsToCopy]);
      neuron.setBiasWeight(neuronToCopy.getBiasWeight());
    }

    // Cloning hidden layers
    for (let l = 0; l < this.hiddenLayers.length; l++) {
      const layerToCopy = this.hiddenLayers[l];
      for (let n = 0; n < layerToCopy.getNeuronsCount(); n++) {
        const neuronToCopy = layerToCopy.getNeuron(n);
        const weightsToCopy = neuronToCopy.getWeights();
        const neuron = neuralNetwork.hiddenLayers[l].getNeuron(n);
        neuron.setWeights([...weightsToCopy]);
        neuron.setBiasWeight(neuronToCopy.getBiasWeight());
      }
    }

    // Cloning output layer
    for (let n = 0; n < this.outputLayer.getNeuronsCount(); n++) {
      const neuronToCopy = this.outputLayer.getNeuron(n);
      const weightsToCopy = neuronToCopy.getWeights();
      const neuron = neuralNetwork.outputLayer.getNeuron(n);
      neuron.setWeights([...weightsToCopy]);
      neuron.setBiasWeight(neuronToCopy.getBiasWeight());
    }

    return neuralNetwork;
  }
}
