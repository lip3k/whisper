export class Comment {

  _id: string;
  text: string;
  author: string;
  postedOn: number;
  rating = 0;
  voted: boolean;
  comments: Comment[];

  constructor(text: string, author: string) {
    this._id = '';
    this.text = text;
    this.author = author;
    this.voted = false;
  }

}
