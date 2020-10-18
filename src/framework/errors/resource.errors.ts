import { APIError } from './errors';

export class ResourceNotFound extends APIError {
  constructor(detail: string) {
    super(404, detail);
  }
}
