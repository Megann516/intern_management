Ext.define("TDK.MODMAIN.sekolah_pkl.Csekolah_pkl", {
  extend: "Ext.app.ViewController",
  alias: "controller.Csekolah_pkl",
  init: function (view) {
    this.control({
      //
    });
    this.listen({
      store: {},
    });
    this.var_global = {
      jwt: localStorage.getItem("TDK_JWT"),
    };
    this.var_definition = {};
    this.renderpage();
  },
  formatAmount: function (value) {
    var text = Ext.util.Format.number(value, "0,000.00/i");
    return text;
  },
  formatNumber: function (value) {
    var text = Ext.util.Format.number(value, "0,000/i");
    return text;
  },
  renderpage: function () {
    try {
      console.log("renderer controller");
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  btrefresh: function (cmp) {
    try {
      var FRMmain = cmp.up("form");
      var GRID = FRMmain.query("grid[pid=GRIDsekolah_pkl]")[0];
      GRID.getStore().load();
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  GRIDsekolah_pkl_itemclick : function (xgrid, rowIndex, colIndex, e, a, rec) {
    try {
      // var me = this;
      // var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var popup =  Ext.create("TDK.MODMAIN.sekolah_pkl.FRMsekolah_pkl", {});
      popup.query("form")[0].getForm().reset();
      popup.query("form")[0].getForm().setValues(rec.data);
      popup.query("form")[0].getForm().loadRecord(rec);
      popup.query("button[pid=btsave]")[0].on("click", this.btsave_click, this);
      popup.query("button[pid=btdelete]")[0].on("click", this.btdelete_click, this);
      return popup.show();
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },

  btsave_click: function(button) {
    try {
        var form = button.up('window').query("form")[0].getForm();
        var values = form.getValues();
        var record = form.getRecord();
        record.set(values);
        button.up('window').close();
        COMP.TipToast.msgbox("Sukses", "Data berhasil disimpan.", { cls: "success", delay: 2000 });
    } catch (ex) {
        COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
},

btdelete_click: function(button) {
  Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin ingin menghapus data ini?', function(choice) {
      if (choice === 'yes') {
          try {
              var form = button.up('window').query("form")[0].getForm();
              var record = form.getRecord()
              var grid = Ext.ComponentQuery.query("grid[pid=GRIDsekolah_pkl]")[0];
              var store = grid.getStore();
              store.remove(record);
              button.up('window').close();
              COMP.TipToast.msgbox("Sukses", "Data berhasil dihapus.", { cls: "success", delay: 2000 });
          } catch (ex) {
              COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
          }
      }
  });
},
});
