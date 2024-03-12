import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OidcProviderDetailsController extends Controller {
  @service router;
  @service flashMessages;

  @action
  async delete() {
    try {
      await this.model.destroyRecord();
      this.flashMessages.success('Provider deleted successfully');
      this.router.transitionTo('vault.cluster.access.oidc.providers');
    } catch (error) {
      this.model.rollbackAttributes();
      const message = error.errors ? error.errors.join('. ') : error.message;
      this.flashMessages.danger(message);
    }
  }
}
