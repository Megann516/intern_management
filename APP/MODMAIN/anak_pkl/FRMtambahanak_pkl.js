var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
Ext.define("TDK.MODMAIN.anak_pkl.FRMtambahanak_pkl", {
  extend: "Ext.window.Window",
  alias: "widget.FRMtambahanak_pkl",
  reference: "FRMtambahanak_pkl",
  modal: true,
  title: "Input PIC Admin",
  closeAction: "destroy",
  centered: true,
  layout: "fit",
  width: mainpanel ? mainpanel.getWidth() * 0.30 : 400, 
  height: mainpanel ? mainpanel.getHeight() * 0.60 : 600, 
  bodyStyle: "background:#FFFFFF",
  bodyBorder: false,
  items: [
    {
        xtype: 'form',
        reference: 'tambahform',
        pid : 'tambahform',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [
            {
                fieldLabel: 'Name',
                name: 'NAME',
            },
            {
                fieldLabel: 'Age',
                name: 'AGE',
                xtype: 'numberfield',
            },
            {
              fieldLabel: 'JENIS KELAMIN',
              name: 'JENIS_KELAMIN',
              xtype: 'combobox',
              reference: 'genderCombo',
              displayField: 'value',
              valueField: 'value',
              store: {
                  fields: ['value'],
                  data: [
                      { value: 'Laki-laki' },
                      { value: 'Perempuan' }
                  ]
              },
              queryMode: 'local',
              typeAhead: true
          },
            {
                fieldLabel: 'Hobby',
                name: 'HOBBY',
            },
            {
                fieldLabel: 'Programming Skills',
                name: 'PROGRAMMING_SKILLS',
                xtype: 'combobox',
                reference: 'progCombo',
                displayField: 'value',
                valueField: 'value',
                store: {
                  fields: ['value'],
                  data: [
                      { value: 'JavaScript' },
                      { value: 'Python' },
                      { value: 'Java' },
                      { value: 'C++' },
                      { value: 'C#' },
                  ]
              },
            },
            {
              fieldLabel: 'Alamat Rumah',
              name: 'ALAMAT_RUMAH', 
          },
            {
              fieldLabel: 'Tanggal Lahir',
              name: 'TANGGAL_LAHIR',
              xtype: 'datefield', 
          },
        ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        { xtype: "tbspacer", width: 10 },
        { xtype: "button", text: "Add", pid: "bttambah", icon: vconfig.getstyle + "icon/add.ico", tooltip: "Save data" },
      ],
    },
  ],
});
