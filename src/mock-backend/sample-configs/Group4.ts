import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'colors',
  type: 'multiple',
  custom: {
    title: 'What colors do you like?',
    min: 1
  },
  validators: ['notNullMultiple'],
  choices: [
    { value: 'colorBlind', custom: { title: 'I am color blind' }, onSelected: { disable: ['red', 'yellow', 'blue', 'green', 'purple', 'white', 'black', 'grey', 'colorsOthersChoice'] } },
    { id: 'red', custom: { title: 'Red' } },
    { id: 'yellow', custom: { title: 'Yellow' } },
    { id: 'blue', custom: { title: 'Blue' } },
    { id: 'green', custom: { title: 'Green' } },
    { id: 'purple', custom: { title: 'Purple' } },
    { id: 'white', custom: { title: 'White' } },
    { id: 'black', custom: { title: 'Black' } },
    { id: 'grey', custom: { title: 'Grey' } },
    { id: 'colorsOthersChoice', value: 'others', custom: { title: 'Others' }, onSelected: { enable: ['colorOthers'] } }
  ]
});

questions.push({
  id: 'colorOthers',
  defaultDisabled: true,
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
