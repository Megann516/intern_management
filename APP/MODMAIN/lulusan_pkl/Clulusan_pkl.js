Ext.define("TDK.MODMAIN.lulusan_pkl.Clulusan_pkl", {
  extend: "Ext.app.ViewController",
  alias: "controller.Clulusan_pkl",
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

  btnrefresh: function(btn) {
    // Dapatkan grid yang memiliki pid "GRIDanak_pkl"
    var grid = btn.up("grid[pid=GRIDlulusan_pkl]"); 
    
    // Jika grid ditemukan, reload store grid tersebut
    if (grid) {
      grid.getStore().reload();
    } else {
      console.log("Grid 'GRIDlulusan_pkl' tidak ditemukan.");
    }
  },
  GRIDlulusan_pkl_itemclick : function(){
    Ext.create('Ext.window.Window', {
      height: 300,
      width: 400,
      title: 'Detail',
      scrollable: true,
      bodyPadding: 10,
      html: 'ini windows detail',
      constrain: true,
      closable: true,
      draggable: false,
  }).show();
}
});
