Ext.define("TDK.Cmainpage", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cmainpage",
  init: function (view) {
    this.control({
      "mainpage Vloginpage button[pid=btlogin]": { click: this.btlogin_click },
      "mainpage button[btid=btid]": { click: this.btmenu_click },
      "mainpage button >>[pid=btlogout]": { click: this.btlogout_click },
      "mainpage button >>[pid=btchange_password]": { click: this.btchange_password_click },
      "mainpage Vmainpage tabpanel[pid=modmasterTAB]": { add: this.tab_panelmenu_add },
      "Vprofile button[pid=btsave_profile]": { click: this.btsave_profile_click },

      "Vloginpage textfield[name=UserLogin]": { specialkey: this.dokeyUserLogin },
      "Vloginpage textfield[name=UserPassword]": { specialkey: this.dokeyUserPassword },
    });
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
  formatDate: function (value) {
    var text = value === null ? "" : moment(value).format("YYYY-MM-DD HH:mm:ss");
    return text;
  },
  renderpage: function () {
    try {
      var me = this;
      var FRMmain = me.getView();
      FRMmain.check_email = true;
      var panel = Ext.ComponentQuery.query("mainpage")[0];
      var tabpanel_dashboard = Ext.ComponentQuery.query("mainpage Vmainpage tabpanel[pid=mainpage_tabpanel] [pid=mainpage_tabpanel_dashboard]")[0];

      var Vuserlogin = Ext.ComponentQuery.query("mainpage Vmainpage [pid=Vuserlogin]")[0];
      var Vuserdepartment = Ext.ComponentQuery.query("mainpage Vmainpage [pid=Vuserdepartment]")[0];
      var taskemail = new Ext.util.TaskRunner();

      if (localStorage.getItem("TDK_JWT") === null) {
        this.SetActivepanel(0);
      } else {
        var TDK_JWT = localStorage.getItem("TDK_JWT");

        var hasil = COMP.run.gethide(vconfig.service_main + "reload", "", "POST", TDK_JWT);
        hasil.then(function (content) {
          var val = Ext.decode(content, true);
          var valprofile = Ext.decode(val.profile, true);
          if (val.success === "true") {
            me.SetActivepanel(1);
            Vuserlogin.setHtml(valprofile[0].USERLOGIN);
            Vuserdepartment.setHtml(valprofile[0].USERDEPT);
            var dtmenu = {
              header: Ext.decode(val.dtmenu_header),
              sub1: Ext.decode(val.dtmenu),
            };
            me.configuration_menu(dtmenu);
            me.configuration_dashboard(tabpanel_dashboard, valprofile[0]);

            // penambahan task email
            taskemail.start({
              run: function () {
                if (FRMmain.check_email === true) {
                  //return me.check_emailsend();
                }
              },
              interval: 9000, // 9 detik
            });
            // ======================
          }
        }, this);
      }
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  check_emailsend: function () {
    try {
      var me = this;
      var FRMmain = me.getView();
      FRMmain.check_email = false;
      var params = Ext.encode({
        method: "read_data",
      });
      var hasil = COMP.run.gethide(vconfig.service_api + "send_email/send_email", params, "POST", localStorage.getItem("TDK_JWT"));
      hasil.then(function (content) {
        FRMmain.check_email = true;
      }, this);
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  GetActivepanel: function () {
    try {
      var panel = Ext.ComponentQuery.query("mainpage")[0];
      var actindex = panel.getLayout().activeItem;
      var idx = panel.items.indexOf(actindex);
      return idx;
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  SetActivepanel: function (val) {
    try {
      var panel = Ext.ComponentQuery.query("mainpage")[0];
      panel.setActiveItem(val);
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  dokeyUserLogin: function (field, event, options) {
    try {
      var form = this.lookupReference("Vloginpage");
      if (event.getKey() === event.ENTER) {
        form.getForm().findField("UserPassword").focus(true);
      }
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  dokeyUserPassword: function (field, event, options) {
    try {
      if (event.getKey() === event.ENTER) {
        this.btlogin_click();
      }
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  btchange_password_click: function () {
    try {
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      COMP.run.getmodulepopup("Vprofile", "TDK.Vprofile", mainpanel);
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  Vprofile_load: function (cmp) {
    try {
      var localprofile = localStorage.getItem("TDK_PROFILE");
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var vprofile = Ext.decode(localprofile)[0];
      //console.log(vprofile);
      var FRM = cmp.query("form")[0];
      FRM.getForm().setValues({
        USERLOGIN: vprofile.USERLOGIN,
        USERNAME: vprofile.USERNAME,
        USERGROUP: vprofile.USERGROUP,
      });
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btsave_profile_click: function () {
    try {
      var me = this;
      var mainpanel = Ext.ComponentQuery.query("mainpage")[0];
      var FRM = Ext.ComponentQuery.query("Vprofile form")[0];
      var vdt = FRM.getValues(false, false, false, true);
      if (vdt.PASSWORD_LAMA === "") {
        COMP.TipToast.msgbox("Error", "Input Password lama lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (vdt.PASSWORD_BARU === "") {
        COMP.TipToast.msgbox("Error", "Input Password lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (vdt.PASSWORD_CONFIRM === "") {
        COMP.TipToast.msgbox("Error", "Input Password Confirm lebih dulu", { cls: "danger", delay: 2000 });
        return false;
      }
      if (vdt.PASSWORD_LAMA === vdt.PASSWORD_BARU) {
        COMP.TipToast.msgbox("Error", "Password Baru tidak boleh sama", { cls: "danger", delay: 2000 });
        return false;
      }
      if (vdt.PASSWORD_BARU !== vdt.PASSWORD_CONFIRM) {
        COMP.TipToast.msgbox("Error", "Password Confirm tidak sama", { cls: "danger", delay: 2000 });
        return false;
      }

      var params = Ext.encode({
        method: "change_password",
        data: Ext.encode(vdt),
      });
      var hasil = COMP.run.getservice(vconfig.service_api + "myprofile/myprofile", params, "POST", localStorage.getItem("TDK_JWT"));
      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success == "true") {
          COMP.TipToast.msgbox("Success", val.message, { cls: "success", delay: 2000 });
          me.btlogout_click();
        } else {
          COMP.TipToast.msgbox("Error", val.message, { cls: "danger", delay: 2000 });
        }
      });
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btlogin_click: function () {
    try {
      //var ST_NJC = new Ext.data.proxy.SessionStorage({ id: "ST_NJC" });
      var Vuserlogin = Ext.ComponentQuery.query("mainpage Vmainpage [pid=Vuserlogin]")[0];
      var Vuserdepartment = Ext.ComponentQuery.query("mainpage Vmainpage [pid=Vuserdepartment]")[0];

      Ext.create("Ext.data.Store", {
        id: "TDK_JWT_PROFILE",
        proxy: {
          type: "localstorage",
          id: "TDK_JWT_PROFILE",
        },
      });
      Ext.create("Ext.data.Store", {
        id: "TDK_JWT",
        proxy: {
          type: "localstorage",
          id: "TDK_JWT",
        },
      });
      var Vloginpage = Ext.ComponentQuery.query("mainpage Vloginpage")[0];

      var dtval = Vloginpage.getValues(false, false, false, true);
      var params = {
        method: "login",
        data: {
          username: dtval.UserLogin,
          password: dtval.UserPassword,
        },
      };

      var me = this;

      var hasil = COMP.run.gethide(vconfig.service_url, Ext.encode(params), "POST");

      hasil.then(function (content) {
        var val = Ext.decode(content, true);
        if (val.success === "true") {
          localStorage.setItem("TDK_JWT", val.token);
          localStorage.setItem("TDK_PROFILE", val.profile);

          /*
          COMP.TipToast.toast("success", val.messages, { cls: "success", delay: 3000 });
          var valprofile = Ext.decode(val.profile, true);
          Vuserlogin.setHtml(valprofile[0].USERLOGIN);
          Vuserdepartment.setHtml(valprofile[0].USERDEPT);

          
          me.SetActivepanel(1);
          var dtmenu = {
            header: Ext.decode(val.dtmenu_header),
            sub1: Ext.decode(val.dtmenu),
          };
          me.configuration_menu(dtmenu);
          */
          location.reload();
        } else {
          COMP.TipToast.msgbox("Error", val.message, { cls: "danger", delay: 3000 });
        }
      }, this);
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  configuration_menu: function (dtmenu) {
    try {
      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var Vaccordion = Ext.ComponentQuery.query("mainpage Vmainpage [pid=MAIN_ACCORDION]")[0];

      let menu_header = groupBy(dtmenu.header, "DEFNAME");
      Ext.iterate(menu_header, function (key, val) {
        var vmenu_header = [];
        Ext.iterate(val, function (key2, val2) {
          var vsub2 = [];

          //======================
          dtmenu.sub1.filter(function (nkey) {
            if (nkey.MPARRENT === key2.MCODE && nkey.MCHILDREN == "FALSE") {
              vsub2.push({ leaf: true, text: nkey.MNAME, allowclick: true, mmodule: nkey.MMODULE, mfolder: key2.MCONTROL, mcontrol: nkey.MCONTROL, mtooltip: nkey.MQTIP, vdata: nkey });
            }
            if (nkey.MPARRENT === key2.MCODE && nkey.MCHILDREN == "TRUE") {
              var vsub3 = [];

              dtmenu.sub1.filter(function (nkey_sub2) {
                if (nkey_sub2.MPARRENT === nkey.MCODE && nkey_sub2.MCHILDREN == "FALSE") {
                  vsub3.push({ leaf: true, text: nkey_sub2.MNAME, allowclick: true, mmodule: nkey_sub2.MMODULE, mfolder: nkey_sub2.MCONTROL, mcontrol: nkey_sub2.MCONTROL, mtooltip: nkey_sub2.MQTIP, vdata: nkey_sub2 });
                }
              });

              vsub2.push({
                text: "<b>" + nkey.MNAME + "</b>",
                children: vsub3,
                allowclick: false,
                vdata: nkey,
              });
            }
          });

          //======================
          vmenu_header.push({
            text: "<b>" + key2.MNAME + "</b>",
            children: vsub2,
            allowclick: false,
          });
        });
        Vaccordion.add({
          icon: vconfig.basepath + "style/icon/app.png",
          title: key,
          rootVisible: false,
          border: false,
          items: [
            {
              xtype: "treepanel",
              rootVisible: false,
              border: false,
              store: {
                type: "tree",
                data: {
                  text: "Ext JS",
                  expanded: false,
                  children: vmenu_header,
                  allowclick: false,
                },
              },
              listeners: {
                itemclick: "mainmenu_link_click",
              },
            },
          ],
        });
      });
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  mainmenu_link_click: function (cmp, rec) {
    try {
      var recdt = rec.data;
      if (recdt.allowclick === false) {
        return false;
      }
      var me = this;
      var Vmaintab = Ext.ComponentQuery.query("mainpage Vmainpage tabpanel[pid=mainpage_tabpanel]")[0];
      var modulepage = "TDK." + recdt.mmodule + "." + recdt.mcontrol + "." + recdt.mcontrol;
      var tab_id = recdt.mmodule + "_" + recdt.mcontrol;
      var ntab = Vmaintab.child("#" + tab_id);
      if (!ntab) {
        try {
          ntab = Vmaintab.add(
            Ext.create(modulepage, {
              waitMsgTarget: true,
              id: tab_id,
              itemId: tab_id,
              closable: true,
              frame: false,
              border: false,
              title: recdt.mtooltip,
              vdata: rec.data.vdata,
            })
          );
        } catch (err) {
          COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
        }
      }
      Vmaintab.setActiveTab(ntab);
    } catch (err) {
      COMP.TipToast.msgbox("Error", err.message, { cls: "danger", delay: 2000 });
    }
  },
  btlogout_click: function () {
    try {
      localStorage.clear();
      location.reload();
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  tab_panelmenu_add: function (cmp) {
    try {
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
  configuration_dashboard: function (cmp, vinfo) {
    try {
      var me = this;
      cmp.removeAll();
      nvar = "Vdashboard";
      cmp.add({
        xtype: nvar,
      });
    } catch (ex) {
      COMP.TipToast.msgbox("Error", ex.message, { cls: "danger", delay: 2000 });
    }
  },
});
