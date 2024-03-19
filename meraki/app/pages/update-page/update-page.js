import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';

import { bbvaWebAmountAmbient } from '@bbva-web-components/bbva-web-amount';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import { bbvabranch } from '@bbva-web-components/bbva-foundations-microillustrations';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-panel-info/bbva-panel-info.js';
import commonStyles from '../../elements/styles/common-styles.js';
import styles from './update-page-styles.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';

const DEFAULT_I18N_KEYS = {
  updateTitle: 'update-page.title',
};

class UpdatePage extends intl(CellsPage) {
  static get is() {
    return 'update-page';
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
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }


  constructor() {
    super();
    this.pageTitle = 'Actualización de Datos';
    this.i18nKeys = DEFAULT_I18N_KEYS;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <demo-app-template page-title="${this.t(this.i18nKeys.updateTitle)}">
        <bbva-header-main
          slot="app-header"
          accessibility-text-icon-right-primary="bbvaMenu"
          image=""
          text="${this.pageTitle}"
        ></bbva-header-main>
        <div slot="app-main-content">
            <div class="info-container">
              <bbva-panel-info
                disabled-tabindex
                heading-level-title="h3"
                .microillustration=${bbvabranch}
                heading="Es necesario que vayas a una oficina"
                text="Acércate a una oficina para validar tu información y continuar con la solicitud."
              >
              <bbva-web-button-default style="margin-top: 1rem;" @click="${this._clickDashboard}">Salir</bbva-web-button-default>
              </bbva-panel-info>
          </div>
        </div>
      </demo-app-template>
    `;
  }
  _clickDashboard() {
    this.navigate('dashboard');
  }

}

window.customElements.define(UpdatePage.is, UpdatePage);
