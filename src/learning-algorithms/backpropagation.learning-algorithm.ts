import { NeuralNetwork } from "../neural-network/neural-network";
import { LearningAlgorithm } from "./learning-algorithm";

export interface BackpropagationLearningAlgorithmOptions {
  learningRate?: number;
  maxEpoch?: number;
  neuralNetwork: NeuralNetwork;
}

export class BackpropagationLearningAlgorithm implements LearningAlgorithm {
  protected neuralNetwork: NeuralNetwork;
  protected learningRate: number;
  protected maxEpoch: number;
  protected epoch: number = 0;
  protected trainingIndex: number = 0;
  protected trainingInputs: number[][] = [];
  protected trainingOutputs: number[][] = [];

  public constructor({
    learningRate,
    maxEpoch,
    neuralNetwork,
  }: BackpropagationLearningAlgorithmOptions) {
    this.learningRate = learningRate ? learningRate : 0.1;
    this.maxEpoch = maxEpoch ? maxEpoch : 1;
    this.neuralNetwork = neuralNetwork;
  }

  public setNeuralNetwork(neuralNetwork: NeuralNetwork): void {
    this.neuralNetwork = neuralNetwork;
  }

  public getNeuralNetwork(): NeuralNetwork {
    return this.neuralNetwork;
  }

  public setLearningRate(learningRate: number): void {
    this.learningRate = learningRate;
  }

  public getLearningRate(): number {
    return this.learningRate;
  }

  public setMaxTrainingCycle(maxTrainingCycle: number): void {
    this.maxEpoch = maxTrainingCycle;
  }

  public getMaxTrainingCycle(): number {
    return this.maxEpoch;
  }

  public setTrainingData(
    trainingInputs: number[][],
    trainingOutputs: number[][]
  ): void {
    this.trainingInputs = trainingInputs;
    this.trainingOutputs = trainingOutputs;
  }

  public addTrainingData(
    trainingInputs: number[],
    trainingOutputs: number[]
  ): void {
    this.trainingInputs.push(trainingInputs);
    this.trainingOutputs.push(trainingOutputs);
  }

  public clearTrainingData(): void {
    this.trainingInputs = [];
    this.trainingOutputs = [];
  }

  public train(): void {
    this.epoch = 0;
    this.trainingIndex = 0;
    const oldWeights: number[][][] = [];
    const deltas: number[][] = [];
    while (this.epoch < this.maxEpoch) {
      this.neuralNetwork.setInputs(this.trainingInputs[this.trainingIndex]);
      this.neuralNetwork.calculate(true);
      let currentLayer = this.neuralNetwork.getOutputLayer();
      let previousLayer = currentLayer.getPreviousLayer();
      let nextLayer = currentLayer.getNextLayer();
      let l = this.neuralNetwork.getHiddenLayers().length;
      while (previousLayer) {
        if (!oldWeights[l]) {
          oldWeights[l] = [];
        }
        if (!deltas[l]) {
          deltas[l] = [];
        }
        const neuronsCount = currentLayer.getNeuronsCount();
        for (let n = 0; n < neuronsCount; n++) {
          if (!oldWeights[l][n]) {
            oldWeights[l][n] = [];
          }
          const neuron = currentLayer.getNeuron(n);
          const inputsCount = neuron.getInputsCount();
          for (let i = 0; i <= inputsCount; i++) {
            const input =
              i < inputsCount ? neuron.getInput(i) : neuron.getBias();
            const weight =
              i < inputsCount ? neuron.getWeight(i) : neuron.getBiasWeight();
            oldWeights[l][n][i] = weight;
            let delta = 0;
            if (!nextLayer) {
              const error =
                neuron.getOutput() -
                this.trainingOutputs[this.trainingIndex][n];
              delta = error * neuron.getOutputDerivative();
            } else {
              const nextNeuronsCount = nextLayer.getNeuronsCount();
              let nextDelta = 0;
              for (let nextN = 0; nextN < nextNeuronsCount; nextN++) {
                nextDelta += oldWeights[l + 1][nextN][n] * deltas[l + 1][nextN];
              }
              delta = nextDelta * neuron.getOutputDerivative();
            }
            deltas[l][n] = delta;
            const newWeight = weight - this.learningRate * delta * input;
            if (i < inputsCount) {
              neuron.setWeight(i, newWeight);
            } else {
              neuron.setBiasWeight(newWeight);
            }
          }
        }
        currentLayer = previousLayer;
        previousLayer = currentLayer.getPreviousLayer();
        nextLayer = currentLayer.getNextLayer();
        l--;
      }
      this.trainingIndex++;
      if (this.trainingIndex >= this.trainingInputs.length) {
        this.trainingIndex = 0;
        this.epoch++;
      }
    }
  }
}
