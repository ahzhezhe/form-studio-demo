import { Validator } from 'form-studio';

export const validators: Record<string, Validator> = {
  notNullMultiple: (value, { custom }) => {
    const { max } = custom;
    let min = custom.min;
    if (min === undefined) {
      min = 1;
    }
    if (!Array.isArray(value)) {
      throw new Error('Must be an array.');
    }
    if (!!min && value.length < min) {
      throw new Error(`Please select no less than ${min} option.`);
    }
    if (!!max && value.length > max) {
      throw new Error(`Please select no more than ${max} option.`);
    }
  },

  notNullSingle: value => {
    if (value === undefined) {
      throw new Error('Please select an option.');
    }
  },

  notNull: value => {
    if (!value) {
      throw new Error('This field is required.');
    }
  },

  email: value => {
    const emailRegex = /^[0-9a-zA-Z_\-+.]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof value !== 'string' || !emailRegex.test(value)) {
      throw new Error('Please enter a valid email address.');
    }
  }
};
