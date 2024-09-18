import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'colors',
  type: 'choices',
  custom: {
    title: 'What colors do you like?',
    min: 1
  },
  validators: ['notNullMultiple'],
  choices: [
    { id: 'colors_colorBlind', value: 'colorBlind', custom: { title: 'I am color blind' } },
    { value: 'red', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'Red' } },
    { value: 'yellow', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'Yellow' } },
    { value: 'blue', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'Blue' } },
    { value: 'green', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'Green' } },
    { value: 'purple', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'Purple' } },
    { value: 'white', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'White' } },
    { value: 'black', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'Black' } },
    { value: 'grey', disabledOnSelected: [['colors_colorBlind']], custom: { title: 'Grey' } },
    { id: 'colors_others', value: 'others', custom: { title: 'Others' } }
  ]
});

questions.push({
  id: 'colorOthers',
  defaultDisabled: true,
  enabledOnSelected: [['colors_others']],
  type: 'any',
  custom: {
    inputType: 'string',
    sub: true,
    title: 'Please specify',
    placeholder: 'Colors',
    maxLength: 100
  },
  validators: ['notNull']
});

export const group4: GroupConfigs = {
  custom: { title: 'Color' },
  questions
};
