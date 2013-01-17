enyo.kind({
  name: "Tweet",
  kind: enyo.Control,
  tag: "div",
  style: "padding-left:10px; text-align:center" +
         "padding: 10px; margin: 10px; margin-bottom:50px; min-height: 50px; max-width:320px;",

  published: {
    icon: "",
    handle: "",
    text: ""
  },

  components: [
    { tag: "img", name: "icon",
      style: "width: 50px; height: 50px; float: left; padding-right: 10px" },
    { tag: "b", name: "handle" },
    { tag: "span", name: "text" }
  ],

  create: function() {
    this.inherited(arguments);
    this.iconChanged();
    this.handleChanged();
    this.textChanged();
  },

  iconChanged: function() {
    this.$.icon.setAttribute("src", this.icon);
  },

  handleChanged: function() {
    this.$.handle.setContent(this.handle + ": ");
  },

  textChanged: function() {
    this.$.text.setContent(this.text);
  }
});