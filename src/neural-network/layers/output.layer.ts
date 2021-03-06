import { Layer } from "./layer";

export class OutputLayer extends Layer {
  public setPreviousLayer(previousNeuralLayer?: Layer): void {
    this.previousLayer = previousNeuralLayer;
    if (this.previousLayer && this.previousLayer.getNextLayer() !== this) {
      this.previousLayer.setNextLayer(this);
    }
  }

  public setNextLayer(nextNeuralLayer?: Layer): void {
    this.nextLayer = undefined;
  }
}
