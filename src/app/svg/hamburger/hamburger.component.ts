import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  template: `<div
    class="btn btn-outline-light"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasControls"
    aria-controls="offcanvasControls"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-list"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      />
    </svg>
  </div>`,
})
export class HamburgerComponent {}
