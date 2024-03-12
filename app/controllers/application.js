import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import config from '../config/environment';

export default Controller.extend({
  env: config.environment,
  auth: service(),
  store: service(),
  activeCluster: computed('auth.activeCluster', function () {
    let id = this.auth.activeCluster;
    return id ? this.store.peekRecord('cluster', id) : null;
  }),
  activeClusterName: computed('activeCluster', function () {
    const activeCluster = this.activeCluster;
    return activeCluster ? activeCluster.get('name') : null;
  }),
});
