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
    { value: 'colorBlind', ui: { title: 'I am color blind' }, onSelected: { disable: ['red', 'yellow', 'blue', 'green', 'purple', 'white', 'black', 'grey', 'colorsOthersChoice'] } },
    { id: 'red', ui: { title: 'Red' } },
    { id: 'yellow', ui: { title: 'Yellow' } },
    { id: 'blue', ui: { title: 'Blue' } },
    { id: 'green', ui: { title: 'Green' } },
    { id: 'purple', ui: { title: 'Purple' } },
    { id: 'white', ui: { title: 'White' } },
    { id: 'black', ui: { title: 'Black' } },
    { id: 'grey', ui: { title: 'Grey' } },
    { id: 'colorsOthersChoice', value: 'others', ui: { title: 'Others' }, onSelected: { enable: ['colorOthers'] } }
  ]
});

questions.push({
  id: 'colorOthers',
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
  ui: { title: 'Color' },
  questions
};
