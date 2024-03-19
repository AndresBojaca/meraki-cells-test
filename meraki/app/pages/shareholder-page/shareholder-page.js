/* eslint-disable no-return-assign */
import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-form-input/bbva-form-input.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-web-components/bbva-form-radio-button/bbva-form-radio-button.js';
import { bbvaHelp, bbvaBuilding } from '@bbva-web-components/bbva-foundations-icons';
import {
  bbvaClose,
} from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@bbva-web-components/bbva-clip-box/bbva-clip-box.js';
import '@bbva-web-components/bbva-web-panel-button/bbva-web-panel-button.js';
import '@bbva-web-components/bbva-list-contact/bbva-list-contact.js';
import '@bbva-experience-components/bbva-type-icon/bbva-type-icon.js';
import '@bbva-web-components/bbva-web-divider/bbva-web-divider.js';
import { bbvaWebPanelButtonAmbient } from '@bbva-web-components/bbva-web-panel-button';
import { bbvaWebListItemMovementPreloadingAmbient } from '@bbva-web-components/bbva-web-list-item-movement';

import commonStyles from '../../elements/styles/common-styles.js';
import styles from './shareholder-page.css.js';
import { obtenerIniciales } from '../../scripts/utils/iniciales.js';

const returnIcon = bbvaClose();
const helpIcon = bbvaHelp();
const companyIcon = bbvaBuilding();

const DEFAULT_I18N_KEYS = {

  returnText: 'pages.return-text',
  shareholderTitle: 'Accionista',
};

/* eslint-disable new-cap */
class ShareholderPage extends intl(CellsPage) {
  static get is() {
    return 'shareholder-page';
  }

  static get styles() {
    return [
      commonStyles,
      styles,
      bbvaWebPanelButtonAmbient.dark,
      bbvaWebListItemMovementPreloadingAmbient.dark,
    ];
  }

  static get properties() {
    return {
      dataLoadedShareholder: {
        type: Boolean,
      },
      dataLoadedCompanyShareholders: {
        type: Boolean,
      },
      pageState: {
        type: Object,
        attribute: false,
      },
      _id: {
        type: String,
      },
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  async fetchAccionista(id) {
    try {
      const response = await fetch('http://localhost:3002/accionistas/' + id);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.shareholder = data;

      if (data.TipoDocumento === 'NIT') {
        this.fetchEmpresa(data.NIT);
      }
      console.log(data);
      this.dataLoadedShareholder = true;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async fetchEmpresa(nit) {
    try {
      const response = await fetch('http://localhost:3002/accionistas?NIT=' + nit);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.companyShareholders = data;
      this.dataLoadedCompanyShareholders = true;
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  constructor() {
    super();
    this.pageTitle = 'COMPOSICIÓN DEL ACCIONISTA';
    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.shareholder = {};
    this.company = {};
    this.i18nKeys = DEFAULT_I18N_KEYS;
  }


  firstUpdated(props) {
    // eslint-disable-next-line no-unused-expressions
    super.firstUpdated && super.firstUpdated(props);
    const queryScope = this.shadowRoot ? this.shadowRoot : this;
    this._menu = queryScope.querySelector('bbva-header-main');
    this.dm = queryScope.querySelector('demo-data-dm');
    this._template = queryScope.querySelector('demo-app-template');
    const gridDefaultPageTemplateNode =
      queryScope.querySelector('demo-app-template');
    Object.assign(gridDefaultPageTemplateNode.regionAttributes, {
      header: { ambient: 'dark400' },
      main: { ambient: 'light' },
      footer: { ambient: 'dark300' },
      'main-pre': { ambient: 'dark300' },
    });

    this.publish('login_info', true);

    this._menu.addEventListener(
      'header-main-icon-right-primary-click',
      this._backNavigation.bind(this)
    );
  }

  connectedCallback() {
    super.connectedCallback();
  }

  renderShareholders() {
    return html`
    <bbva-type-text text="COMPOSICIÓN DEL ACCIONISTA" tag="h4"></bbva-type-text>
      ${this.companyShareholders.map((obj) => html`
        <bbva-list-contact
          action-icon-primary=""
          action-icon-secondary=""
          content-title="${obj.Nombre} ${obj.Apellido}"
          title-icon=""
          badge-text="Participación: ${obj.Porcentaje}"
          badge-type="success"
          icon-clip-box="${obj.TipoDocumento === 'NIT' ? companyIcon : ''}"
          initials="${obj.TipoDocumento === 'CC' ? obtenerIniciales(`${obj.Nombre} ${obj.Apellido}`) : ' '}"
          no-action-icons
          .descriptions=${[ `${obj.TipoDocumento} ${obj.Documento}` ]}
        >
      </bbva-list-contact>
        <bbva-web-divider size="full"></bbva-web-divider>
      `)}
    `;
  }


  onPageEnter() {
    this.language = localStorage.getItem('language');
    const id = this.params.id;
    this.fetchAccionista(id);
    this._setSettings();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  onPageLeave() {
    this.shareholder = {};
  }

  _openMenu({ detail }) {
    if (detail) {
      this._emit('open-drawer-state');
    } else {
      this._emit('close-drawer-state');
    }
  }

  _emit(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
      })
    );
  }

  _backNavigation(detail) {
    this.navigate('dashboard');
  }

  get _headerTpl() {
    return html`
      <bbva-header-main
        slot="app-header"
        .iconRightPrimary="${returnIcon}"
        accessibility-text-icon-right-primary="Menu"
        accessibility-text-icon-left-primary="${this.t(
    this.i18nKeys.returnText
  )}"
        text="Composición del accionista"
        ambient="transparent"
      ></bbva-header-main>
    `;
  }

  get _appMainPreTpl() {
    return html` <div
      slot="app-main-pre"
      data-grid="full-width"
      ambient="dark400"
    >
    </div>`;
  }

  render() {
    return html` <demo-app-template
      page-title="Accionista">
      ${this._headerTpl} ${this._appMainPreTpl}
      <div slot="app-main-content" data-grid="full-width" class="app-main-content">
      <div class="shareholder-info">
        <bbva-clip-box class="bitone"
        icon="${this.shareholder.TipoDocumento === 'NIT' ? companyIcon : ''}"
        text="${this.shareholder.TipoDocumento === 'CC' ? obtenerIniciales(`${this.shareholder.Nombre} ${this.shareholder.Apellido}`) : ' '}" size="large"> </bbva-clip-box>
        <bbva-type-text text="${this.shareholder.Nombre} ${this.shareholder.Apellido}" tag="h4"></bbva-type-text>
      </div>
      <bbva-type-text text="INFORMACIÓN SOBRE EL ACCIONISTA" tag="h4"></bbva-type-text>
      <div class="form-control">
        <bbva-form-input type="text" label="Tipo de Documento" readonly value="${this.shareholder.TipoDocumento}" ambient="dark"></bbva-form-input>
      </div>
      <div class="form-control">
        <bbva-form-input type="text" label="Número de Identificación" readonly value="${this.shareholder.Documento}" ambient="primary-dark"></bbva-form-input>
      </div>
      <div class="form-control">
        <bbva-form-input type="text" label="Nombre" readonly value="${this.shareholder.Nombre}" ambient="primary-dark"></bbva-form-input>
      </div>
      <div class="form-control">
        <bbva-form-input type="text" label="Apellido" readonly value="${this.shareholder.Apellido}" ambient="primary-dark"></bbva-form-input>
      </div>
      <div class="form-control">
        <bbva-form-input type="text" label="Porcentaje de participación" readonly value="${this.shareholder.Porcentaje}" ambient="primary-dark"></bbva-form-input>
      </div>

        ${this.shareholder.TipoDocumento === 'NIT' ? this.dataLoadedCompanyShareholders ? this.renderShareholders() : html`<p>Loading...</p>`
    :
    html`
        <div>
        <bbva-type-text text="PERSONAS EXPUESTAS POLÍTICAMENTE (PEP)" tag="h4" disabled></bbva-type-text>
          <div class="pep-text">
            <span>¿Es una Persona Expuesta Politicamente (PEP), está relacionada, asociada omes familiar de una?</span>
            <bbva-type-icon icon=${helpIcon} size="32" icon-color="#1973b8" ></bbva-type-icon>
          </div>
          <div class="d-flex">
            <bbva-form-radio-button name="pep" value="0" style="margin-right: 1rem;" @click="" checked>Sí</bbva-form-radio-button>
            <bbva-form-radio-button name="pep" value="1">No</bbva-form-radio-button>
          </div>

        </div>`
}
      <div class="text-center">
        <bbva-web-button-default style="margin: 3rem 0;" @click="${this._clickLeave}">Salir</bbva-web-button-default>
      </div>
    </div>
    </demo-app-template>`;
  }

  _clickLeave() {
    this.navigate('update');
  }

}


window.customElements.define(ShareholderPage.is, ShareholderPage);
