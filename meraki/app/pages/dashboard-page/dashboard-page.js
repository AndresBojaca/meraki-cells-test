import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';

import { obtenerIniciales } from '../../scripts/utils/iniciales.js';

import { bbvaBuilding } from '@bbva-web-components/bbva-foundations-icons';
import { bbvaWebAmountAmbient } from '@bbva-web-components/bbva-web-amount';
import '@bbva-web-components/bbva-list-contact/bbva-list-contact.js';
import '@bbva-web-components/bbva-web-divider/bbva-web-divider.js';
import '@bbva-web-components/bbva-notification-message/bbva-notification-message.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import commonStyles from '../../elements/styles/common-styles.js';
import styles from './dashboard-page-styles.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';

const companyIcon = bbvaBuilding();
const DEFAULT_I18N_KEYS = {
  dashboardTitle: 'dashboard-page.title',
};

class DashboardPage extends intl(CellsPage) {
  static get is() {
    return 'dashboard-page';
  }

  static get styles() {
    return [
      commonStyles,
      styles,
      bbvaWebAmountAmbient.dark,
    ];
  }

  static get properties() {
    return {
      dataLoaded: {
        type: Boolean,
      },
      shareholders: {
        type: Array,
      },
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  async fetchData() {
    try {
      const response = await fetch('http://localhost:3002/accionistas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.shareholders = data;
      console.log(data);

      this.dataLoaded = true;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  constructor() {
    super();
    this.pageTitle = 'Accionistas';
    this.dataLoaded = false;
    this.shareholders = [];
    this.i18nKeys = DEFAULT_I18N_KEYS;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  render() {
    return html`
      <demo-app-template page-title="${this.t(this.i18nKeys.dashboardTitle)}">
        <bbva-header-main
          slot="app-header"
          accessibility-text-icon-right-primary="bbvaMenu"
          image=""
          text="${this.pageTitle}"
        ></bbva-header-main>
        <div slot="app-main-content">
          <div>
            <bbva-type-text text="${this.pageTitle}" tag="h4"></bbva-type-text>
            <p>Esta es la información sobre los accionistas de tu empresa </p>
          </div>
          ${this.dataLoaded
    ?
    this.renderShareholders()
    :
    html`<p>Cargando...</p>`}
          <div class="message-container">
            <bbva-notification-message
              class="message"
              message=""
              description="Recuerda que si desea actualizar la informacion de los accionistas,deberás dirigirte a tu oficina o canal web."
            >
          </bbva-notification-message>
            <bbva-web-button-default style="margin: 1rem 0 3rem 0;">Continuar</bbva-web-button-default>
          </div>
        </div>
      </demo-app-template>
    `;
  }

  renderShareholders() {
    return html`
      ${this.shareholders.map((obj) => html`
        <bbva-list-contact
          @list-contact-link-click="${() => this._clickShareholders(obj.id)}"
          action-icon-primary=""
          action-icon-secondary=""
          content-title="${obj.Nombre} ${obj.Apellido}"
          icon-clip-box="${obj.TipoDocumento === 'NIT' ? companyIcon : ''}"
          initials="${obj.TipoDocumento === 'CC' ? obtenerIniciales(`${obj.Nombre} ${obj.Apellido}`) : ' '}"
          badge-text="Participación: ${obj.Porcentaje}"
          badge-type="success"
          no-action-icons
          .descriptions=${[ `${obj.TipoDocumento} ${obj.Documento}` ]}
        >
      </bbva-list-contact>
      <bbva-web-divider size="full"></bbva-web-divider>
      `)}
    `;
  }

  _clickShareholders(_id) {
    this.navigate('shareholder', { id: _id });
  }

}

window.customElements.define(DashboardPage.is, DashboardPage);
