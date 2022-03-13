import {
  ActivationFunctionType,
  ACTIVATION_FUNCTIONS,
} from './activationFunction';
import { Link } from './link';

export interface Neuron {
  id: string;
  links: Link[];
  bias: number;
  output: number;
  activationType: ActivationFunctionType;
}

export const newNeuron = (
  fields: Partial<Neuron> & Pick<Neuron, 'id'>
): Neuron => ({
  links: [],
  bias: 0,
  output: 0,
  activationType: ActivationFunctionType.LINEAR,
  ...fields,
});

export const setId = (neuron: Neuron, id: string): Neuron => ({
  ...neuron,
  id,
});

export const setLinks = (neuron: Neuron, links: Link[]): Neuron => ({
  ...neuron,
  links,
});

export const mapLinks = (
  neuron: Neuron,
  callback: (value: Link, index: number, array: Link[]) => Link
): Neuron => setLinks(neuron, neuron.links.map(callback));

export const setBias = (neuron: Neuron, bias: number): Neuron => ({
  ...neuron,
  bias,
});

export const setOutput = (neuron: Neuron, output: number): Neuron => ({
  ...neuron,
  output,
});

export const setActivationType = (
  neuron: Neuron,
  activationType: ActivationFunctionType
): Neuron => ({
  ...neuron,
  activationType,
});

export const predict = (neuron: Neuron): Neuron => {
  const { bias, links, activationType } = neuron;
  const activation = ACTIVATION_FUNCTIONS[activationType];
  const outputBeforeActivation = links.reduce(
    (acc, { input, weight }) => acc + input * weight,
    bias
  );
  const output = activation.activate(outputBeforeActivation);
  return setOutput(neuron, output);
};