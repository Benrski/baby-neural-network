import {
  ActivationFunctionType,
  ACTIVATION_FUNCTIONS,
} from './activationFunction';
import { set } from './utils/object';

export interface Neuron {
  id: string;
  weights: number[];
  bias: number;
  activationType: ActivationFunctionType;
}

export const newNeuron = (
  fields: Partial<Neuron> & Pick<Neuron, 'id'>
): Neuron => ({
  weights: [],
  bias: 0,
  activationType: ActivationFunctionType.LINEAR,
  ...fields,
});

export const setId = (neuron: Neuron, id: string): Neuron =>
  set(neuron, 'id', id);

export const setWeights = (neuron: Neuron, weights: number[]): Neuron =>
  set(neuron, 'weights', weights);

export const setBias = (neuron: Neuron, bias: number): Neuron =>
  set(neuron, 'bias', bias);

export const setActivationType = (
  neuron: Neuron,
  activationType: ActivationFunctionType
): Neuron => set(neuron, 'activationType', activationType);

export const predict = (neuron: Neuron, inputs: number[]): number => {
  const { bias, weights, activationType } = neuron;
  const activation = ACTIVATION_FUNCTIONS[activationType];
  const outputBeforeActivation = weights.reduce(
    (total, weight, weightIndex) => total + weight * inputs[weightIndex],
    bias
  );
  return activation.activate(outputBeforeActivation);
};
