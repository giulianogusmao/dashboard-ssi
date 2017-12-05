export class NotificationModel {

  constructor(
    private _id: string,
    private _controller?: string,
  ) { }

  get id() {
    return this._id;
  }

  get controller() {
    return this._controller;
  }

  isEquals(id: string, controller: string) {
    return this._id === id && this._controller === controller;
  }

  isEqualsController(controller: string) {
    if (!controller) {
      return false;
    }

    return this._controller === controller;
  }
}
