/* $Id$ */

import Ember from 'ember';
import layout from '../templates/components/basic-modal';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),

  ok: "OK",

  cancel: "Cancel",

  layout: layout,

  content: null,

  isAlert: false,

  size: 'small',

  classNames: ['ui', 'modal', 'scrolling'],

  classNameBindings: ['size'],

  closable: false,

  isPrompt: false,

  labelValue: null,

  promptPlaceholder: null,

  promptValue: null,

  didInsertElement: function() {
    this.$().modal({
      transition: this.get('transition'),

      onHidden: () => {
        this.destroyElement();
      },

      onApprove: () => {
        let promptValue = this.get('promptValue');
        if (this.get('isPrompt')) {
          this.sendAction('approveClicked', promptValue);
        } else {
          this.sendAction('approveClicked');
        }
      },

      onDeny: () => {
        this.sendAction('denyClicked');
      }
    }).modal('show');
  }
});
