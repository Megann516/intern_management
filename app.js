Ext.onReady(function () {
  Ext.Loader.setConfig({ enabled: true });
  Ext.Loader.setPath("COMP", "components");
  Ext.Loader.setPath("POPUP", "APP/ACLASS");
  Ext.Loader.setPath("APP_PATH", "APP");
  Ext.Loader.setPath("Ext.ux", "js/ux");

  var currentDomain = window.location.protocol + "//" + window.location.host;
  Ext.define("vconfig", {
    singleton: true,
    LOG: {},
    verify: {},
    setting: {},
    getstyle: Ext.getWin().dom.location.href + "style/",
    basepath: Ext.getWin().dom.location.href,

    base_url: currentDomain,
    service_main: currentDomain + "/intern_management/apservice/home/",
    service_url: currentDomain + "/intern_management/apservice/home/auth/",
    service_api: currentDomain + "/intern_management/apservice/home/api/",
  });

  Ext.application({
    name: "TDK",
    appFolder: "APP",
    autoCreateViewport: "TDK.mainpage",
    requires: ["vconfig"],
    launch: function () {
      Ext.Ajax.on("requestexception", function (conn, response, options, eOpts) {
        if (response.status === 401) {
          Ext.Msg.alert("Session Expired", "Your session has expired. Please login again.", function () {
            window.location.href = "/intern_management";
          });
        }
      });
    },
  });
});
