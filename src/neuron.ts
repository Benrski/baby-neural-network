import {
  ActivationFunctions,
  ActivationFunctionType,
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
  fields: Partial<Neuron> & Pick<Neuron, 'id' | 'activationType'>
): Neuron => ({
  links: [],
  bias: 0,
  output: 0,
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

export const predict = (
  neuron: Neuron,
  activationFunctions: ActivationFunctions
): Neuron => {
  const { bias, links, activationType } = neuron;
  const activation = activationFunctions[activationType];
  const outputBeforeActivation = links.reduce(
    (acc, { input, weight }) => acc + input * weight,
    bias
  );
  const output = activation.activate(outputBeforeActivation);
  return setOutput(neuron, output);
};
