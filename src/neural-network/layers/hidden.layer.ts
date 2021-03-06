import { Layer } from "./layer";

export class HiddenLayer extends Layer {
  public setPreviousLayer(previousNeuralLayer?: Layer): void {
    this.previousLayer = previousNeuralLayer;
    if (this.previousLayer && this.previousLayer.getNextLayer() !== this) {
      this.previousLayer.setNextLayer(this);
    }
  }

  public setNextLayer(nextNeuralLayer?: Layer): void {
    this.nextLayer = nextNeuralLayer;
    if (this.nextLayer && this.nextLayer.getPreviousLayer() !== this) {
      this.nextLayer.setPreviousLayer(this);
    }
  }
}
