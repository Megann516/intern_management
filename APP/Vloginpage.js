Ext.define("TDK.Vloginpage", {
  extend: "Ext.form.Panel",
  alias: "widget.Vloginpage",
  reference: "Vloginpage",
  layout: {
    type: "card",
    pack: "start",
    align: "stretch",
  },
  border: false,
  items: [
    {
      items: false,
      border: false,
      layout: "center",
      bodyStyle: {
        background: "#ffffff",
        backgroundImage: "url(document/images/background2.avif)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      },
      items: [
        {
          title: "Login Application",
          frame: true,
          width: 400,
          height: 250,
          bodyPadding: 10,
          bodyStyle: "background:#FFFFFF;background-color:#FFFFFF",
          items: [
            {
              xtype: "container",
              frame: false,
              border: false,
              layout: "vbox",
              items: [
                {
                  xtype: "panel",
                  margin: "0 0 10 0",
                  layout: "center",
                  border: false,
                  frame: false,
                  items: [
                    {
                      xtype: "container",
                      layout: "hbox",
                      items: [
                        {
                          xtype: "container",
                          layout: { type: "vbox", pack: "start", align: "stretch" },
                          items: [
                            {
                              xtype: "label",
                              margin: "0 0 0 20",
                              align: "center",
                              style: "color: #757575; font-weight: bold; font-size: 18px;font-family:Arial Black;font-weight: bold;",
                              html: "Data Anak PKL",
                            },
                            {
                              xtype: "label",
                              margin: "0 0 0 3",
                              style: "color: #757575; font-weight: bold; font-size: 14px;font-family:Arial Black;font-weight: bold;",
                              html: "",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              xtype: "textfield",
              name: "UserLogin",
              fieldLabel: "User Login",
              allowBlank: false,
              labelAlign: "left",
              emptyText: "user Login",
            },
            {
              xtype: "textfield",
              name: "UserPassword",
              fieldLabel: "Password",
              allowBlank: false,
              labelAlign: "left",
              emptyText: "password",
              inputType: "password",
            },
          ],

          buttons: [{ text: "Login", pid: "btlogin" }],
        },
      ],
    },
    { xtype: "tbspacer", width: "2%" },
  ],
});
