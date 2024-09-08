var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MODMAIN.anak_pkl.FRManak_pkl", {
  extend: "Ext.window.Window",
  alias: "widget.FRManak_pkl",
  reference: "FRManak_pkl",
  modal: true,
  title: "Input PIC Admin",
  closeAction: "destroy",
  centered: true,
  layout: "fit",
  width: mainpanel ? mainpanel.getWidth() * 0.30 : 400, 
  height: mainpanel ? mainpanel.getHeight() * 0.60 : 600,
  bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
  layout: { type: "vbox", pack: "start", align: "stretch" },
  bodyBorder: false,
  items: [
    {
        xtype: 'form',
        reference: 'detailForm', // Referensi form untuk akses nantinya
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [
            {
                fieldLabel: 'Name',
                name: 'NAME', // Nama field yang akan dikirim ke server
            },
            {
                fieldLabel: 'Age',
                name: 'AGE', // Nama field yang akan dikirim ke server
                xtype : 'numberfield',
            },
            {
                fieldLabel: 'Hobby',
                name: 'HOBBY', // Nama field yang akan dikirim ke server
            },
            {
                fieldLabel: 'Programming Skills',
                name: 'PROGRAMMING_SKILLS', // Nama field yang akan dikirim ke server
            },
          ],
    },
  
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      height: 30,
      dock: "top",
      items: [
        //
        { xtype: "tbspacer", width: 10 },
        "-",
        { xtype: "button", text: "Save", pid: "btsave", icon: vconfig.getstyle + "icon/save.ico", tooltip: "Save data" },
        { xtype: "button", text: "Delete", pid: "btdelete", icon: vconfig.getstyle + "icon/delete.ico", tooltip: "Delete data" },
        "-",
        "->",
      ],
      // other options....
    },
  ],
  listeners: {},
});