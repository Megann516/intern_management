var mainpanel = Ext.ComponentQuery.query("mainpage")[0];

Ext.define("TDK.MODMAIN.sekolah_pkl.FRMsekolah_pkl", {
  extend: "Ext.window.Window",
  alias: "widget.FRMsekolah_pkl",
  reference: "FRMsekolah_pkl",
  modal: true,
  title: "Edit Data",
  closeAction: "destroy",
  centered: true,
  layout: "fit",
  width: mainpanel.getWidth() * 0.43,
  height: mainpanel.getHeight() * 0.63,
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  layout: {
    type: "vbox",
    pack: "start",
    align: "stretch"
  },
  bodyBorder: false,

  items: [
    {
      xtype: "form",
      reference: "detailForm",
      bodyPadding: 10,
      layout: "fit",
      fieldDefaults: {
        labelAlign: "left",
        labelWidth: 200,
        width: 500,
        margin: "5 5 5 5",
        archor: "100%"
      },
      items: [
        {
          xtype: "container",
          layout: "vbox",
          labelwidth: 300,
          height: 550,
          items: [
            {
              xtype: "textfield",
              fieldLabel: "NAMA SEKOLAH",
              name: "NAMA_SEKOLAH"
            },
            {
              xtype: "textfield",
              fieldLabel: "KONTAK",
              name: "KONTAK"
            },
            {
              xtype: "textarea",
              name: "ALAMAT",
              fieldLabel: "Start",
              width: 500,
              allowBlank: false
                // {
                //   xtype: "textfield",
                //   name: "KODE_POS",
                //   fieldLabel: "KODE POS",
                //   emptyText: "KODE POS",
                //   width: 90,
                //   allowBlank: false
                // }
            },
            {
              xtype: "textfield",
              fieldLabel: "PEMBIMBING",
              name: "PEMBIMBING"
            },
            {
              xtype: "textfield",
              fieldLabel: "KONTAK PEMBIMBING",
              name: "KONTAK_PEMBIMBING"
            },
            {
              xtype: "textfield",
              fieldLabel: "EMAIL SEKOLAH",
              name: "EMAIL_SEKOLAH"
            },
            {
              xtype: "textfield",
              fieldLabel: "WEBSITE SEKOLAH",
              name: "WEBSITE_SEKOLAH"
            }
          ]
        }
      ]
    }
  ],

  dockedItems: [
    {
      xtype: "toolbar",
      height: 40,
      dock: "bottom",
      items: [
        { xtype: "tbfill", width: 10 },
        {
          xtype: "button",
          text: "Save",
          pid: "btsave",
          icon: vconfig.getstyle + "icon/save.ico",
          tooltip: "Save data"
        },
        {
          xtype: "button",
          text: "Delete",
          pid: "btdelete",
          icon: vconfig.getstyle + "icon/delete.ico",
          tooltip: "Delete data"
        }
      ]
    }
  ],
});
