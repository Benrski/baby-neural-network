import {
  ActivationFunctionType,
  ACTIVATION_FUNCTIONS,
} from './activationFunction';

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

export const setId = (neuron: Neuron, id: string): Neuron => ({
  ...neuron,
  id,
});

export const setWeights = (neuron: Neuron, weights: number[]): Neuron => ({
  ...neuron,
  weights,
});

export const setBias = (neuron: Neuron, bias: number): Neuron => ({
  ...neuron,
  bias,
});

export const setActivationType = (
  neuron: Neuron,
  activationType: ActivationFunctionType
): Neuron => ({
  ...neuron,
  activationType,
});

export const predict = (neuron: Neuron, inputs: number[]): number => {
  const { bias, weights, activationType } = neuron;
  const activation = ACTIVATION_FUNCTIONS[activationType];
  const outputBeforeActivation = weights.reduce(
    (total, weight, weightIndex) => total + weight * inputs[weightIndex],
    bias
  );
  return activation.activate(outputBeforeActivation);
};
