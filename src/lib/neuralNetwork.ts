import { ActivationFunctionType } from './activationFunction';
import { newLink, setInput as setLinkInput } from './link';
import { random } from './math';
import {
  mapLinks as mapNeuronLinks,
  Neuron,
  newNeuron,
  predict as neuronPredict,
} from './neuron';

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
    const linksCount = inputs ?? options[layerIndex - 1]?.neurons ?? 0;

    return Array.from({ length: neurons }, (_, neuronIndex) => {
      const neuronId = `${layerId}-${neuronIndex + 1}`;
      const links = Array.from({ length: linksCount }, (_, linkIndex) => {
        const linkId = `${neuronId}-${linkIndex + 1}`;
        return newLink({ id: linkId, weight: random(-1, 1) });
      });

      return newNeuron({ id: neuronId, links, bias: 1, activationType });
    });
  });
};

export const predict = (
  network: NeuralNetwork,
  inputs: number[]
): NeuralNetwork =>
  network.reduce<NeuralNetwork>((updatedNetwork, layer) => {
    const updatedLayer = layer.map((neuron) => {
      const updatedNeuron = mapNeuronLinks(neuron, (link, linkIndex) => {
        const input =
          updatedNetwork[updatedNetwork.length - 1]?.[linkIndex].output ??
          inputs[linkIndex];

        return setLinkInput(link, input);
      });

      return neuronPredict(updatedNeuron);
    });

    return [...updatedNetwork, updatedLayer];
  }, []);
