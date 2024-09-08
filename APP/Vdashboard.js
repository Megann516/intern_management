Ext.define("TDK.Vdashboard", {
  extend: "Ext.panel.Panel",
  alias: "widget.Vdashboard",
  reference: "Vdashboard",
  layout: { type: "vbox", pack: "start", align: "stretch" },
  border: false,
  frame: false,
  items: [
    {
      xtype: "panel",
      title: "user",
      width: 400,
      height: 400,
    },
  ],
  listeners: {
    //afterRender: "vdashboard_render",
  },
});
