import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | quien-es-mi-representante', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:quien-es-mi-representante');
    assert.ok(controller);
  });
});
