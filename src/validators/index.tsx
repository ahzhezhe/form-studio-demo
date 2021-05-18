import { Validator } from 'form-studio';

export const validators: Record<string, Validator> = {
  atLeast1: value => {
    if (value.length < 1) {
      throw new Error('Please select at least 1 option.');
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
    if (!emailRegex.test(value)) {
      throw new Error('Please enter a valid email address.');
    }
  },

  name: value => {
    if (!value?.firstName || !value?.lastName) {
      throw new Error('This field is required.');
    }
  }
};
