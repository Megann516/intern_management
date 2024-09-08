Ext.define("TDK.MODMAIN.lulusan_pkl.lulusan_pkl", {
  extend: "Ext.form.Panel",
  alias: "widget.lulusan_pkl",
  reference: "lulusan_pkl",
  config: {},
  requires: [
    //
    "TDK.MODMAIN.lulusan_pkl.Clulusan_pkl",
    "TDK.MODMAIN.lulusan_pkl.GRIDlulusan_pkl",
    "TDK.MODMAIN.anak_pkl.Canak_pkl",
    "TDK.MODMAIN.anak_pkl.GRIDanak_pkl",
  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Clulusan_pkl",
  initComponent: function () {
    // validasi department yang digunakan
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_lulusan_pkl",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDlulusan_pkl" }],
    });

    this.callParent(arguments);
  },
});
