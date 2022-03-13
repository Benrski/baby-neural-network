import { ActivationFunctionType } from './activationFunction';
import { Neuron, newNeuron, predict as neuronPredict } from './neuron';
import { random } from './utils/math';

export type NeuralNetwork = Neuron[][];

export type NeuralNetworkOptions = {
  neurons: number;
  activationType?: ActivationFunctionType;
  inputs?: number;
}[];

export const newNeuralNetwork = (
  options: NeuralNetworkOptions
): NeuralNetwork => {
  const layersCount = options.length;

  return Array.from({ length: layersCount }, (_, layerIndex) => {
    const { neurons, activationType, inputs } = options[layerIndex];
    const layerId = `${layerIndex + 1}`;
    const weightsCount = inputs ?? options[layerIndex - 1]?.neurons ?? 0;

    return Array.from({ length: neurons }, (_, neuronIndex) => {
      const neuronId = `${layerId}-${neuronIndex + 1}`;
      const weights = Array.from({ length: weightsCount }, () => random(-1, 1));

      return newNeuron({ id: neuronId, weights, bias: 1, activationType });
    });
  });
};

export const predict = (network: NeuralNetwork, inputs: number[]): number[] => {
  const layersOutputs = network.reduce<number[][]>((layersOutputs, layer) => {
    const layerInputs = layersOutputs[layersOutputs.length - 1] || inputs;

    const layerOutputs = layer.map((neuron) =>
      neuronPredict(neuron, layerInputs)
    );

    return [...layersOutputs, layerOutputs];
  }, []);

  return layersOutputs[layersOutputs.length - 1] || [];
};
