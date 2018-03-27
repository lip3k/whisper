export class Toast {

  success: boolean;
  text: string;

  constructor(text, success) {
    this.text = text;
    this.success = success;
  }

}
