import { LitElement } from 'lit-element';
import { BroncoLeftNavbar } from './app.component';
import './app.component';
import { emit } from 'cluster';

describe('bronco-button', () => {
  let element: BroncoLeftNavbar;

  beforeEach(async () => {
    element = document.createElement('bronco-left-navbar') as BroncoLeftNavbar;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => { element.remove(); });

  it('should render bronco-left-navbar', async () => {
    document.body.appendChild(element);
    await element.updateComplete;
    expect(element.textContent).toBe('');
  });

});
