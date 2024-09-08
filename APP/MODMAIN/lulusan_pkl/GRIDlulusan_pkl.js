Ext.define("TDK.MODMAIN.lulusan_pkl.GRIDlulusan_pkl", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDlulusan_pkl",
  reference: "GRIDlulusan_pkl",
  frame: false,
  border: false,
  layout: { type: "vbox", pack: "start", align: "stretch" },
  requires: [],
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 90,
    margin: "0 10 5 0",
  },
  items: [
    {
      xtype: "grid",
      pid: "GRIDlulusan_pkl",
      emptyText: "No Matching Records",
      autoScroll: true,
      flex: 1,
      store: {
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 20,
        proxy: {
          type: "ajax",
          disableCaching: false,
          noCache: false,
          headers: { Authorization: "Bearer " + localStorage.getItem("TDK_JWT") },
          actionMethods: { read: "POST" },
          url: vconfig.service_api + "lulusan_sekolah/lulusan_sekolahs",
          reader: {
            type: "json",
            rootProperty: "Rows",
            totalProperty: "TotalRows",
            successProperty: "success",
          },
        },
        listeners: {
          beforeload: function (store, operation, eOpts) {
            try {
              var TDK_PROFILE = localStorage.getItem("TDK_PROFILE");
              var vprofile = Ext.decode(TDK_PROFILE)[0];
              operation.setParams({
                method: "read_data",
              });
            } catch (ex) {
              COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
            }
          },
        },
      },

      plugins: ["filterfield"],
      viewConfig: {
        enableTextSelection: true,
      },
      columns: {
        defaults: {
          sortable: true,
          filter: { xtype: 'textfield'}
        },
        items: [
        { xtype: "rownumberer", filter: false},
        {
          xtype: "actioncolumn",
          width: 35,
          align: "center",
          menuDisabled: true,
          filter : false,
          sortable: false,
          items: [
            {
              icon: vconfig.getstyle + "icon/grid.png",
              handler: "GRIDanak_pkl_itemclick",
              tooltip: "Detail Dokumen",
            },
          ],
        },

        { width: 120, header: "NAME", dataIndex: "NAME" },
        { align: "center", width: 70, header: "AGE", dataIndex: "AGE" },
        { width: 100, header: "NAMA SEKOLAH", dataIndex: "NAMA_SEKOLAH" },
        // { width: 200,align: "center", header: "JURUSAN", dataIndex: "JURUSAN_SEKOLAH" },
      ]
      },
      bbar: {
        xtype: "pagingtoolbar",
        displayInfo: true,
        displayMsg: "Displaying topics {0} - {1} of {2}",
        emptyMsg: "No topics to display",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            { xtype: "tbspacer", width: 5 },
            {
              xtype: "button",
              text: "Refresh",
              pid: "btrefresh",
              handler: "btnrefresh",
              icon: vconfig.getstyle + "icon/update.ico",
              tooltip: "Refresh Data",
            },
          ],
        },
      ],
    },
  ],
});
