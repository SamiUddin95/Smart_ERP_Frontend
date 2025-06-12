import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocusNavigation]'
})
export class FocusNavigationDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.setFocusToFirstInputInRow();
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const currentInput = this.el.nativeElement as HTMLElement;
    const currentRow = currentInput.closest('tr');
    const parentTableWrapper = currentInput.closest('.p-datatable'); // <- only within p-table

    if (!currentRow || !parentTableWrapper) return;

    const allRows = Array.from(parentTableWrapper.querySelectorAll('tr'));
    const rowIndex = allRows.indexOf(currentRow);
    const rowInputs = Array.from(currentRow.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];

    const allInputs = Array.from(parentTableWrapper.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
    const currentIndex = allInputs.indexOf(currentInput as HTMLInputElement);

    if (currentIndex === -1) return;

    let targetIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        targetIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        targetIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        if (rowIndex + 1 < allRows.length) {
          const nextRowInputs = Array.from(allRows[rowIndex + 1].querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
          const colIndex = rowInputs.indexOf(currentInput as HTMLInputElement);
          if (nextRowInputs[colIndex]) {
            nextRowInputs[colIndex].focus();
            event.preventDefault();
          }
        }
        return;
      case 'ArrowUp':
        if (rowIndex > 0) {
          const prevRowInputs = Array.from(allRows[rowIndex - 1].querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
          const colIndex = rowInputs.indexOf(currentInput as HTMLInputElement);
          if (prevRowInputs[colIndex]) {
            prevRowInputs[colIndex].focus();
            event.preventDefault();
          }
        }
        return;
      default:
        return;
    }

    while (targetIndex >= 0 && targetIndex < allInputs.length) {
      if (!allInputs[targetIndex].disabled) {
        allInputs[targetIndex].focus();
        event.preventDefault();
        break;
      }
      targetIndex += event.key === 'ArrowRight' ? 1 : -1;
    }
  }

  private setFocusToFirstInputInRow() {
    const currentInput = this.el.nativeElement as HTMLElement;
    const row = currentInput.closest('tr');
    const table = currentInput.closest('.p-datatable');
    if (!row || !table) return;

    const firstInput = row.querySelector('.form-control:not([disabled])') as HTMLInputElement;
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}
