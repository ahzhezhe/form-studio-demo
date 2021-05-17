/* eslint-disable @typescript-eslint/naming-convention */
import { Configs, Validator } from 'form-studio';
import { group1, group2, group3, group4, group5 } from './groups';

export const configs: Configs = [];
configs.push(group1);
configs.push(group2);
configs.push(group3);
configs.push(group4);
configs.push(group5);

export const validators: Record<string, Validator> = {
  atLeast1: value => {
    if (value.length < 1) {
      throw new Error('Please select at least 1 option.');
    }
  },

  notNullSingle: value => {
    if (!value) {
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
  }
};

export const answers = {
  'name': 'Tony Stark',
  'gender': 'male',
  'softwareDeveloper': 'true',
  'programmingLanguages': [
    'javascript',
    'java',
    'python'
  ],
  'react': 'true',
  'reactExperience': 'Amazon',
  'spring': 'false',
  'colors': [
    'red',
    'blue',
    'purple',
    'black',
    'others'
  ],
  'colorOthers': 'Pink',
  'subscribe': 'true',
  'email': 'tony@stark.com'
};
