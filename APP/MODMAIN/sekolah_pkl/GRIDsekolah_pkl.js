Ext.define("TDK.MODMAIN.sekolah_pkl.GRIDsekolah_pkl", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDsekolah_pkl",
  reference: "GRIDsekolah_pkl",
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
      pid: "GRIDsekolah_pkl",
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
          url: vconfig.service_api + "sekolah_pkl/sekolah_pkls",
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
          filter: { xtype: 'textfield'},
        },
        items: [
        { xtype: "rownumberer", filter: false},
        {
          xtype: "actioncolumn",
          width: 35,
          menuDisabled: true,
          filter : false,
          sortable: false,
          align : 'center',
          items: [
            {
              icon: vconfig.getstyle + "icon/grid.png",
              handler: "GRIDsekolah_pkl_itemclick",
              tooltip: "Detail Dokumen",
            },
          ],
        },

        { width: 120, header: "NAMA SEKOLAH", dataIndex: "NAMA_SEKOLAH" },
        { width: 500, header: "ALAMAT", dataIndex: "ALAMAT" },
        { width: 100, header: "KONTAK", dataIndex: "KONTAK" },
        { width: 100, header: "PEMBIMBING", dataIndex: "PEMBIMBING" },
        { width: 150, header: "KONTAK PEMBIMBING", dataIndex: "KONTAK_PEMBIMBING" },
        { width: 150, header: "EMAIL SEKOLAH", dataIndex: "EMAIL_SEKOLAH" },
        { width: 150, header: "WEBSITE SEKOLAH", dataIndex: "WEBSITE_SEKOLAH" },
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
              handler: "btrefresh",
              icon: vconfig.getstyle + "icon/update.ico",
              tooltip: "Refresh Data",
            },
          ],
        },
      ],
    },
  ],
});
