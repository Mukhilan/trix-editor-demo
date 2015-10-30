import Ember from 'ember';
import ModalManager from 'trix-editor-demo/utils/modal-manager';

export default Ember.Component.extend({

  editor: null,

  textContent: "",

  count: 0,

  getEditorElement: function () {
    return this.$('trix-editor')[0];
  },

  getEditorInputElement: function() {
    return this.$("#trix-input-editor");
  },

  didInsertElement: function () {
    this._setEditor();
    this._initEditorKeyListeners();
    this._super();
  },

  _setEditor: function() {
    let editor = this.getEditorElement().editor,
      value = this.get("value");

    if (value && value.length) {
      editor.insertHTML(value);
      this._doUpdate();
    }

    this.set("editor", editor);
  },

  _handleFontStyleButtonStates: function() {
    this._toggleButtonClass(this.getButtonState("bold"), "bold");
    this._toggleButtonClass(this.getButtonState("italic"), "italic");
    this._toggleButtonClass(this.getButtonState("strike"), "strike");
    this._toggleButtonClass(this.getButtonState("number"), "number");
    this._toggleButtonClass(this.getButtonState("bullet"), "bullet");
  },

  _doUpdate: function () {
    let editorInputElement = this.getEditorInputElement(),
        editorContent = editorInputElement.val(),
        editorTextContent = $("<p>").html(editorContent).text();

    if (editorTextContent.length) {
      this.setProperties({
        "value": editorContent,
        "textContent": editorTextContent.trim(),
        "count": editorTextContent.length
      });
    } else {
      this._resetValues();
    }
  },

  _resetValues: function() {
    this.setProperties({
      "value": null,
      "textContent": null,
      "count": 0
    });
  },

  _initEditorKeyListeners: function () {
    $(this.getEditorElement())
      .on("trix-change.editor", () => {
        this._doUpdate();
      })
      .on("keydown.editor", (event) => {
        this._handleKeyBoardEvents(event);
      })
  },

  _handleKeyBoardEvents: function(event) {
    var isCtrlKey = event.ctrlKey,
      isCmdKey = event.metaKey,
      fontStyle = String.fromCharCode(event.which);

    this._handleFontStyleButtonStates();

    if (isCtrlKey || isCmdKey) {
      switch (fontStyle) {
        case "B":
        {
          this.send("fontFormattingAction", "bold");
          break;
        }
        case "I":
        {
          this.send("fontFormattingAction", "italic");
          break;
        }
        case "U":
        {
          this.send("fontFormattingAction", "strike");
          break;
        }
      }
    }
  },

  getButtonElement: function(buttonClass) {
    return this.$("button." + buttonClass);
  },

  _toggleButtonClass: function(buttonState, buttonClass) {
    var buttonElement = this.getButtonElement(buttonClass);

    if (buttonState) {
      buttonElement.addClass("active");
    } else {
      buttonElement.removeClass("active");
    }
  },

  willDestroyElement: function() {
    var rootElement = this.getEditorElement();

    $(rootElement).off(".editor");
  },

  getButtonState: function (attribute) {
    let editor = this.get("editor"),
      currentAttributesList = editor.composition.currentAttributes;

    return editor.attributeIsActive(attribute) && currentAttributesList[attribute];
  },

  actions: {
    fontFormattingAction: function (attribute) {
      let editor = this.get("editor"),
        rootElement = this.getEditorElement(),
        buttonState = this.getButtonState(attribute);

      if (!buttonState) {
        editor.activateAttribute(attribute);
      } else {
        editor.deactivateAttribute(attribute);
      }

      this._toggleButtonClass(!buttonState, attribute);
      rootElement.focus();
    },

    linkAction: function() {
      let editor = this.get("editor"),
        rootElement = this.getEditorElement(),
        linkProtocol = window.location.protocol + '//',
        selectedRange = editor.getSelectedRange();

      ModalManager.prompt({
        title: "Enter a valid URL",
        labelValue: linkProtocol,
        value: null
      }).then((editorLinkValue) => {
        if (editorLinkValue != null && editorLinkValue.length) {
          if (editorLinkValue.substr(0, linkProtocol.length) !== linkProtocol) {
            editorLinkValue = linkProtocol + editorLinkValue;
          }

          editor.setSelectedRange(selectedRange);
          editor.activateAttribute("href", editorLinkValue);
          rootElement.focus();
        }
      });
    },

    unlinkAction: function() {
      let editor = this.get("editor"),
          rootElement = this.getEditorElement(),
          selectedRange = editor.getSelectedRange();

      if((selectedRange[1] - selectedRange[0]) > 0) {
        editor.deactivateAttribute("href");
      }

      rootElement.focus();
    }
  }
});
