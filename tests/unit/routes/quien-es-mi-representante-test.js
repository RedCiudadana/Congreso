import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | quien-es-mi-representante', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:quien-es-mi-representante');
    assert.ok(route);
  });
});
