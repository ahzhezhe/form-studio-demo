import { GroupConfigs, QuestionConfigs } from 'form-studio';

const questions: QuestionConfigs[] = [];

questions.push({
  id: 'subscribe',
  type: 'single',
  custom: {
    title: 'Would you like to subscribe to our mailing list?'
  },
  validators: ['notNullSingle'],
  choices: [
    { value: 'true', custom: { title: 'Yes' }, onSelected: { enable: ['email'] } },
    { value: 'false', custom: { title: 'No' } }
  ]
});

questions.push({
  id: 'email',
  defaultDisabled: true,
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
