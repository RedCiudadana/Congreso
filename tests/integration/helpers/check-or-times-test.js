
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('check-or-times', 'helper:check-or-times', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{check-or-times inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

