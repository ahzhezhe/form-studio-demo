import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'subscribe',
  type: 'single',
  ui: {
    title: 'Would you like to subscribe to our mailing list?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'true', ui: { title: 'Yes' }, onSelected: { enable: ['email'] } },
    { value: 'false', ui: { title: 'No' } }
  ]
});

questions.push({
  id: 'email',
  defaultDisabled: true,
  type: 'any',
  ui: {
    inputType: 'string',
    title: 'Email address',
    placeholder: 'Email address',
    maxLength: 250
  },
  validators: ['email']
});

export const group5: GroupConfigs = {
  ui: { title: 'Subscription' },
  questions
};
