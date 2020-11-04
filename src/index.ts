/**
 * Copyright 2020 Jam Risser
 * Copyright 2014 - 2020 Balena
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import snakecase from 'lodash.snakecase';

let getStackTrace: (e: ErrorTS, err: Error | string) => void;
if (Error.captureStackTrace != null) {
  const { captureStackTrace } = Error;
  getStackTrace = (e) => {
    captureStackTrace(e, e.constructor);
  };
} else {
  getStackTrace = (e, err) => {
    if (!(err instanceof Error)) {
      err = new Error(err);
    }
    if (err.stack != null) {
      e.stack = err.stack;
    }
  };
}

export class ErrorTS extends Error {
  public message: string = '';

  public name: string;

  public stack: string = '';

  constructor(err: Error | string = '') {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    if (err) {
      if (err instanceof Error) {
        this.message = err.message;
      } else {
        this.message = err;
      }
    } else if (!this.message)
      this.message = snakecase(this.name).replace(/_/g, ' ');
    getStackTrace(this, err);
  }
}
