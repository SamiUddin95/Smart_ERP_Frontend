import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocusNavigation]'
})
export class FocusNavigationDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // ✅ New row add hone par us row ke pehle input ko focus karo
    const currentRow = this.el.nativeElement.closest('tr');
    const parentTable = this.el.nativeElement.closest('.p-datatable');
    if (!currentRow || !parentTable) return;

    const allRows = Array.from(parentTable.querySelectorAll('tbody tr'));
    const rowIndex = allRows.indexOf(currentRow);

    if (rowIndex === allRows.length - 1) {
      this.focusFirstInput(currentRow);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const currentInput = this.el.nativeElement as HTMLInputElement;
    const currentRow = currentInput.closest('tr');
    const table = currentInput.closest('.p-datatable');

    if (!currentRow || !table) return;

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const rowIndex = rows.indexOf(currentRow);

    // ✅ Sirf enabled inputs lo
    const inputsInRow = Array.from(currentRow.querySelectorAll('input.form-control:not([disabled]), select:not([disabled]), textarea:not([disabled])')) as HTMLElement[];
    const colIndex = inputsInRow.indexOf(currentInput);

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.focusNextEnabled(inputsInRow, colIndex + 1, 1);
        break;

      case 'ArrowLeft':
        event.preventDefault();
        this.focusNextEnabled(inputsInRow, colIndex - 1, -1);
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.moveVertical(rows, rowIndex, colIndex, 1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.moveVertical(rows, rowIndex, colIndex, -1);
        break;
    }
  }

  private moveVertical(rows: Element[], rowIndex: number, colIndex: number, step: number) {
    let newRowIndex = rowIndex + step;
    while (newRowIndex >= 0 && newRowIndex < rows.length) {
      const row = rows[newRowIndex];
      const enabledInputs = Array.from(row.querySelectorAll('input.form-control:not([disabled]), select:not([disabled]), textarea:not([disabled])')) as HTMLElement[];
      if (enabledInputs.length > 0) {
        if (colIndex < enabledInputs.length) {
          this.focusInput(enabledInputs[colIndex]);
        } else {
          this.focusInput(enabledInputs[enabledInputs.length - 1]);
        }
        break;
      }
      newRowIndex += step; // ✅ skip disabled-only row
    }
  }

  private focusNextEnabled(inputs: HTMLElement[], startIndex: number, step: number) {
    let index = startIndex;
    while (index >= 0 && index < inputs.length) {
      const input = inputs[index];
      if (!input.hasAttribute('disabled')) {
        this.focusInput(input);
        break;
      }
      index += step; // ✅ skip disabled inputs
    }
  }

  private focusInput(input: HTMLElement) {
    if (input) {
      input.focus();
      if ((input as HTMLInputElement).select) {
        (input as HTMLInputElement).select();
      }
    }
  }

  private focusFirstInput(row: Element) {
    const firstInput = row.querySelector('input.form-control:not([disabled]), select:not([disabled]), textarea:not([disabled])') as HTMLInputElement;
    if (firstInput) {
      setTimeout(() => {
        firstInput.focus();
        firstInput.select();
      }, 50);
    }
  }
}
