import { Answers, Configs } from 'form-studio';
import { group1, group2, group3, group4, group5 } from './sample-configs';

const sampleConfigs: Configs = {
  groups: [group1, group2, group3, group4, group5]
};

const sampleAnswers = {
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

class MockBackend {

  private configs: Configs = sampleConfigs;
  private answers: Answers = sampleAnswers;

  getConfigs() {
    return this.configs;
  }

  saveConfigs(configs: Configs) {
    this.configs = configs;
  }

  getAnswers() {
    return this.answers;
  }

  saveAnswers(answers: Answers) {
    this.answers = answers;
  }

}

export const mockBackend = new MockBackend();
