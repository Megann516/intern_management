Ext.define("TDK.Vmainpage", {
  extend: "Ext.panel.Panel",
  alias: "widget.Vmainpage",
  reference: "Vmainpage",
  layout: { type: "border", pack: "start", align: "stretch" },
  border: false,
  frame: false,
  requires: ["TDK.Vdashboard"],
  items: [
    {
      region: "north",
      frame: false,
      border: false,
      width: 165,
      height: 45,
      bodyPadding: "5 5 5 5",
      layout: { type: "hbox", pack: "start", align: "stretch" },
      items: [
        {
          xtype: "container",
          width: 300,
          layout: { type: "vbox", pack: "start", align: "stretch" },
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [{ xtype: "component",align : "center", html: "<b>PT Tunas Data Kreasi</b>" }],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [{ xtype: "component", html: "<b>Version alpha 1.0.0</b>" }],
            },
          ],
        },
        {
          xtype: "tbspacer",
          flex: 1,
        },
        {
          xtype: "container",
          width: 100,
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [
                {
                  xtype: "button",
                  text: "My Account",
                  icon: vconfig.getstyle + "icon/user.ico",
                  menu: [
                    {
                      text: "Log Out",
                      pid: "btlogout",
                      icon: vconfig.getstyle + "icon/logout.ico",
                    },
                    {
                      text: "Change Password",
                      pid: "btchange_password",
                      icon: vconfig.getstyle + "icon/bulb.ico",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          xtype: "container",
          width: 200,
          layout: { type: "vbox", pack: "start", align: "stretch" },
          items: [
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "component", html: "<b>User Login</b>", width: 100 },
                { xtype: "component", html: "<b>:</b>", width: 10 },
                { xtype: "component", pid: "Vuserlogin", html: "<b>userlogin</b>" },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              items: [
                { xtype: "component", html: "<b>Department</b>", width: 100 },
                { xtype: "component", html: "<b>:</b>", width: 10 },
                { xtype: "component", pid: "Vuserdepartment", html: "<b>Department</b>" },
              ],
            },
            { xtype: "tbspacer", height: 3 },
          ],
        },
      ],
    },
    {
      title: "",
      region: "west",
      border: true,
      frame: false,
      layout: "accordion",
      pid: "MAIN_ACCORDION",
      width: 200,
      items: [],
      dockedItems: [
        {
          xtype: "component",
          height: 30,
          dock: "bottom",
          items: ["-"],
        },
      ],
    },
    {
      collapsible: false,
      region: "center",
      xtype: "tabpanel",
      pid: "mainpage_tabpanel",
      frame: false,
      border: false,
      activeTab: 0,
      items: [
        {
          title: "dashboard",
          pid: "mainpage_tabpanel_dashboard",
          items: [],
        },
      ],
    },
  ],
});
