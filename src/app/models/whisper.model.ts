export class Whisper {

  _id: string;
  text: string;
  author: string;
  postedOn: number;
  rating = 0;
  voted: boolean;
  voters: string[] = [];

  constructor(text: string, author: string) {
    this._id = '';
    this.text = text;
    this.author = author;
    this.voted = false;
  }

}
