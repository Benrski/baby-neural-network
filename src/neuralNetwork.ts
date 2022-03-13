import { ActivationFunctionType } from './activationFunction';
import { newLink } from './link';
import { random } from './math';
import { Neuron, newNeuron } from './neuron';

export type NeuralNetwork = Neuron[][];

export type NeuralNetworkShape = {
  neurons: number;
  activationType: ActivationFunctionType;
}[];

export const newNeuralNetwork = (shape: NeuralNetworkShape): NeuralNetwork => {
  const layersCount = shape.length;

  return Array.from({ length: layersCount }, (_, layerIndex) => {
    const { neurons: neuronsCount, activationType } = shape[layerIndex];
    const layerId = `${layerIndex + 1}`;
    const linksCount = shape[layerIndex - 1]?.neurons ?? 0;
    const bias = layerIndex > 0 ? 1 : 0;

    return Array.from({ length: neuronsCount }, (_, neuronIndex) => {
      const id = `${layerId}-${neuronIndex + 1}`;
      const links = Array.from({ length: linksCount }, () =>
        newLink({ weight: random(-1, 1) })
      );

      return newNeuron({ id, links, bias, activationType });
    });
  });
};
