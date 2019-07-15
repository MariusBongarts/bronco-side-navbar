import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';

const componentCSS = require('./app.component.scss');

/**
 * Left sidebar. To include icons following has to be included in index.html  => <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 * @event selected - Dispatches a CustomEvent when nav item is selected. Selected item is stored in detail of Custom event
 * @cssprop --bg-color - Background color of navitem
 * @cssprop --bg-color-hover - Hover background color of navItem
 * @cssprop --bg-color-icon-hover - Hover color of icon
 * @cssprop --color - Font color
 * @cssprop --padding-top - Defines where navItems should begin
 * @cssprop --primary-color - Change primary color easily
 * @cssprop --sidebar-min-height - Sidebar min height. Default: 20%
 * @cssprop --sidebar-width - Sidebar width. Default: 20%;
 */
@customElement('bronco-side-navbar')
export class BroncoSideNavbar extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  /**
   * Makes the navbar disappear on mobile devices
   * @type {boolean}
   * @memberof BroncoSideNavbar
   */
  @property()
  hideOnMobile = true;

  /**
   * If true, either navbar is completely hidden, when hideOnMobile = true or only leftHeader and rightHeader are shown
   * @type {boolean}
   * @memberof BroncoSideNavbar
   */
  @property()
  mobile = false;

  /**
   * Takes an array to set (minimum: 3, maximum 5) nav items, of this component
   * @type {string[]}
   * @memberof AppRoot
   */
  @property()
  navItems = ['Home', 'Components', 'Documentation', 'Get started'];

  /**
   * Sets selected item. Default is first item
   * @type {string}
   * @memberof BroncoSideNavbar
   */
  @property()
  selectedItem = 'Components';

  @query('ul')
  sideBar!: HTMLElement;

  @query('#drag')
  dragBtn!: HTMLElement;

  firstUpdated() {
    if (window.innerWidth < 928) this.mobile = true;
    window.addEventListener('resize', () => {
      if (window.innerWidth < 928) this.mobile = true;
      if (window.innerWidth >= 928) this.mobile = false;
    });

    this.dragBtn.addEventListener('mousedown', (e: MouseEvent) => {

      // this.dragBtn.addEventListener('mousemove', this.changeSizeOfSidebar , true);
      this.dragBtn.onmousemove = (e: MouseEvent) => {
        this.changeSizeOfSidebar(e);
      };

      window.onmouseup = () => {
        this.dragBtn.onmousemove = () => {
          // Removes the event handler
        };
      };

      // this.dragBtn.addEventListener('mouseup', (e: MouseEvent) => {
      //   this.dragBtn.removeEventListener('mousemove', this.changeSizeOfSidebar, true);
      // });
    });
  }

  changeSizeOfSidebar(e: MouseEvent) {

    this.sideBar.style.width = `${e.clientX}px`;
  }

  emit(selectedItem: string) {
    this.selectedItem = selectedItem;
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: selectedItem,
        bubbles: true
      })
    );
  }

  render() {
    return html`
      <!-- Navbar is not visible on mobile devices -->
      ${this.mobile && this.hideOnMobile ? ''
       : html`
      <ul>
        <div id="drag">
          <i class="material-icons">drag_handle</i>
        </div>
        ${this.navItems.map((navItem) => html`
        <li @click=${() => this.selectedItem = navItem} class="${this.selectedItem === navItem ? 'selected' : ''}">
          <i class="material-icons">home</i>
          ${ navItem}
        </li>
        `)}
      </ul>
      `}

    `;
  }

}
