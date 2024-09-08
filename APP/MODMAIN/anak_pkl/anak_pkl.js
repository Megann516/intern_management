Ext.define("TDK.MODMAIN.anak_pkl.anak_pkl", {
  extend: "Ext.form.Panel",
  alias: "widget.anak_pkl",
  reference: "anak_pkl",
  config: {},
  requires: [
    //
    "TDK.MODMAIN.anak_pkl.Canak_pkl",
    "TDK.MODMAIN.anak_pkl.GRIDanak_pkl",
  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },

  controller: "Canak_pkl",
  //untuk include controller
  //controller: "Cpr_expense_abr",
  initComponent: function () {
    // validasi department yang digunakan
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_anak_pkl",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDanak_pkl" }],
    });

    this.callParent(arguments);
  },
});
