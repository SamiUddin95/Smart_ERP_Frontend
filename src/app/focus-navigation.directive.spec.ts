import { FocusNavigationDirective } from './focus-navigation.directive';
import { ElementRef } from '@angular/core';

describe('FocusNavigationDirective', () => {
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('input')); // Mocking ElementRef
  });

  it('should create an instance', () => {
    const directive = new FocusNavigationDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
