Ext.define("TDK.MODMAIN.sekolah_pkl.sekolah_pkl", {
  extend: "Ext.form.Panel",
  alias: "widget.sekolah_pkl",
  reference: "sekolah_pkl",
  config: {},
  requires: [
    //
    "TDK.MODMAIN.sekolah_pkl.Csekolah_pkl",
    "TDK.MODMAIN.sekolah_pkl.GRIDsekolah_pkl",
    
  ],
  constructor: function (config) {
    return this.callParent(arguments);
  },
  //untuk include controller
  controller: "Csekolah_pkl",
  initComponent: function () {
    // validasi department yang digunakan
    Ext.apply(this, {
      xtype: "panel",
      pid: "panel_sekolah_pkl",
      layout: "card",
      frame: false,
      border: false,
      items: [{ xtype: "GRIDsekolah_pkl" }],
    });

    this.callParent(arguments);
  },
});
