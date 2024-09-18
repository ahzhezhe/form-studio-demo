import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'subscribe',
  type: 'choice',
  custom: {
    title: 'Would you like to subscribe to our mailing list?'
  },
  validators: ['notNullSingle'],
  choices: [
    { id: 'subscribe_true', value: 'true', custom: { title: 'Yes' } },
    { id: 'subscribe_false', value: 'false', custom: { title: 'No' } }
  ]
});

questions.push({
  id: 'email',
  defaultDisabled: true,
  enabledOnSelected: [['subscribe_true']],
  type: 'any',
  custom: {
    inputType: 'string',
    title: 'Email address',
    placeholder: 'Email address',
    maxLength: 250
  },
  validators: ['email']
});

export const group5: GroupConfigs = {
  custom: { title: 'Subscription' },
  questions
};
