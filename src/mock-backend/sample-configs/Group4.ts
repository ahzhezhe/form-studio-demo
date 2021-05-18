import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'colors',
  type: 'multiple',
  ui: {
    title: 'What colors do you like?'
  },
  validators: ['notNullMultiple'],
  validation: { min: 1 },
  choices: [
    { id: 'colorsColorBlind', value: 'colorBlind', ui: { title: 'I am color blind' }, onSelected: { disable: ['colorsRed', 'colorsYellow', 'colorsBlue', 'colorsGreen', 'colorsPurple', 'colorsWhite', 'colorsBlack', 'colorsGrey', 'colorsOthers'] } },
    { id: 'colorsRed', ui: { title: 'Red' } },
    { id: 'colorsYellow', ui: { title: 'Yellow' } },
    { id: 'colorsBlue', ui: { title: 'Blue' } },
    { id: 'colorsGreen', ui: { title: 'Green' } },
    { id: 'colorsPurple', ui: { title: 'Purple' } },
    { id: 'colorsWhite', ui: { title: 'White' } },
    { id: 'colorsBlack', ui: { title: 'Black' } },
    { id: 'colorsGrey', ui: { title: 'Grey' } },
    { id: 'colorsOthers', ui: { title: 'Others' }, onSelected: { enable: ['colorOthers'] } }
  ]
});

questions.push({
  id: 'colorOthersDescription',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    sub: true,
    title: 'Please specify',
    placeholder: 'Colors',
    maxLength: 100
  },
  validators: ['notNull']
});

export const group4: GroupConfigs = {
  id: 'grpColor',
  ui: { title: 'Color' },
  questions
};
