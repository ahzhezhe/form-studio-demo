/* eslint-disable @typescript-eslint/naming-convention */
import { Configs, Validator } from 'form-studio';
import { group1, group2, group3, group4, group5, group6, group7, group8, group9 } from './groups';

export const configs: Configs = [];
configs.push(group1);
configs.push(group2);
configs.push(group3);
configs.push(group4);
configs.push(group5);
configs.push(group6);
configs.push(group7);
configs.push(group8);
configs.push(group9);

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
  }
};

export const answers = {
  'g0_q0': 'g0_q0_c0',
  'g1q2': [
    'g1q2_c1',
    'g1q2_c3'
  ],
  'g1q2others': 'sdfsdfsdf',
  'g1_q0': 'g1_q0_c1',
  'g1_q1': 'g1_q1_c1',
  'grp3_q0': 'grp3_q0_c0',
  'grp3_q1': [
    'grp3_q1_c1',
    'grp3_q1_c3',
    'grp3_q1_c5'
  ],
  'g3q2others': 'dfgdfgdg',
  'grp4_q0': 'grp4_q0_c1',
  'g4q3': [
    'g4q3_c1',
    'g4q3_c4',
    'g4q3_c7'
  ],
  'g4q3other': 'dfgdfgdg',
  'g4q4': [
    'g4q4_c4'
  ],
  'g4q4other': 'fgdfgdfgdfg',
  'grp5_q0': 'grp5_q0_c1',
  'g5q2': [
    'g5q2_c0',
    'g5q2_c3'
  ],
  'g5q2others': 'dfgdgfgg',
  'g5_q0': [
    'g6q1c8',
    'g6q1c10',
    'g6q1c11',
    'g6q1c19'
  ],
  'g6q1others': 'dfsdfdsfdfsf',
  'g6_q0': [
    'g6_q0_c0'
  ],
  'g7_q0': [
    'g8q1c3',
    'g8q1c7'
  ],
  'g8_q0': 'g8_q0_c0',
  'g8_q1': 'g8_q1_c0',
  'g9q3': 'g9q3_c2',
  'g9q5': '98534534',
  'g9q6': 'g9q6_c1',
  'g9q7': 'g9q7_c2',
  'g9q7others': 'sdfsdfsdf',
  'g9q8': 'g9q8_c3',
  'g9q9': 'ahzhe',
  'g9q10': 'g9q10_c2',
  'g9q11': 'g9q11_c2'
};
