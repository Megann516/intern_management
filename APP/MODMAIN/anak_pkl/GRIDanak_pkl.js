Ext.define("TDK.MODMAIN.anak_pkl.GRIDanak_pkl", {
  extend: "Ext.form.Panel",
  alias: "widget.GRIDanak_pkl",
  reference: "GRIDanak_pkl",
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
      pid: "GRIDanak_pkl",
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
          url: vconfig.service_api + "anak_pkl/anak_pkls",
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
          align : 'center',
        },
        items: [
        { xtype: "rownumberer", filter: false},
        {
          xtype: "actioncolumn",
          width: 35,
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
        { width: 120, header: "JENIS KELAMIN", dataIndex: "JENIS_KELAMIN" },
        { width: 70, header: "AGE", dataIndex: "AGE" },
        { width: 100, header: "HOBBY", dataIndex: "HOBBY" },
        {
          width: 200,
          align: "center",
          header: "PROGRAMMING SKILLS",
          dataIndex: "PROGRAMMING_SKILLS",
          filter: {
            xtype: 'combobox',
            reference: 'states',
            publishes: 'value',
            displayField: 'state',
            anchor: '-15',
            store: ['JavaScript', 'Python', 'Java', 'C++', 'C#'],
            minChars: 0,
            queryMode: 'local',
            typeAhead: true
          }
        },
        { width: 120, header: "ALAMAT RUMAH", dataIndex: "ALAMAT_RUMAH" },
        { width: 120, header: "TANGGAL LAHIR", dataIndex: "TANGGAL_LAHIR" },
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
              handler : "btrefresh",
              icon: vconfig.getstyle + "icon/update.ico",
              tooltip: "Refresh Data",
            },{
              xtype: "button",
              text: "Tambah",
              pid: "btntambah",
              handler : "btntambah",
              icon: vconfig.getstyle + "icon/add.ico",
              tooltip: "Tambah data",
            }
          ],
        },
      ],
    },
  ],
});
