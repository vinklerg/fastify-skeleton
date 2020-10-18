import { APIError } from './errors';

export class Unauthorized extends APIError {
  constructor(detail: string) {
    super(403, detail);
  }
}
