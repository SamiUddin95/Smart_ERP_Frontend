import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocusNavigation]'
})
export class FocusNavigationDirective implements AfterViewInit {
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.setFocusToFirstInputInRow();
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const currentInput = this.el.nativeElement as HTMLElement;
    const currentRow = currentInput.closest('tr');
    const parentTableWrapper = currentInput.closest('.p-datatable');

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
        event.preventDefault();
        if (rowIndex + 1 < allRows.length) {
          const nextRow = allRows[rowIndex + 1];
          const nextRowInputs = Array.from(nextRow.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
          const colIndex = rowInputs.indexOf(currentInput as HTMLInputElement);

          if (colIndex >= 0 && nextRowInputs[colIndex]) {
            nextRowInputs[colIndex].focus();
          } else if (nextRowInputs.length > 0) {
            nextRowInputs[0].focus(); // fallback to first input in next row
          }
        }
        return;

      case 'ArrowUp':
        event.preventDefault();
        if (rowIndex > 0) {
          const prevRow = allRows[rowIndex - 1];
          const prevRowInputs = Array.from(prevRow.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
          const colIndex = rowInputs.indexOf(currentInput as HTMLInputElement);

          if (colIndex >= 0 && prevRowInputs[colIndex]) {
            prevRowInputs[colIndex].focus();
          } else if (prevRowInputs.length > 0) {
            prevRowInputs[0].focus(); // fallback to first input in previous row
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
