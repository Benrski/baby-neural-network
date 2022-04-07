import {
  ActivationFunctionType,
  ACTIVATION_FUNCTIONS,
} from './activationFunction';
import { ErrorFunctionType, ERROR_FUNCTIONS } from './errorFunction';
import { newNeuralNetwork, predict } from './neuralNetwork';

export { ActivationFunctionType, ACTIVATION_FUNCTIONS };
export { ErrorFunctionType, ERROR_FUNCTIONS };
export { newNeuralNetwork, predict };
export default {
  ActivationFunctionType,
  ACTIVATION_FUNCTIONS,
  ErrorFunctionType,
  ERROR_FUNCTIONS,
  newNeuralNetwork,
  predict,
};
