<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Budget & Purchasing SUAI</title>

  <?php
  $parts = explode('/', base_url());

  // Mengambil domain dan port
  $domain_port = $parts[0] . '//' . $parts[2];

  // Mengambil path sampai sebelum 'apservice/home'
  $base_path = $domain_port . '/' . $parts[3];

  ?>

  <link href="<?php echo $base_path; ?>/style/fonts/font-awesome.min.css" rel="stylesheet" />
  <link href="<?php echo $base_path; ?>/style/tdk_ungu/tdk_ungu-all.css" rel="stylesheet" />
  <link href="<?php echo $base_path; ?>/style/option.css" rel="stylesheet" />
  <script src="<?php echo $base_path; ?>/js/ext-all.js"></script>
  <script type="text/javascript" src="<?php echo $base_path; ?>/js/charts/classic/charts.js"></script>
  <link href="<?php echo $base_path; ?>/js/charts/classic/classic/resources/charts-all.css" rel="stylesheet" />
  <script type="text/javascript" src="<?php echo $base_path; ?>/js/exporter/build/classic/exporter.js"></script>
  <link rel="stylesheet" type="text/css" href="<?php echo $base_path; ?>/js/exporter/build/classic/resources/exporter-all.css" />
  <script type="text/javascript" src="<?php echo $base_path; ?>/js/component/shim.js"></script>
  <script type="text/javascript" src="<?php echo $base_path; ?>/js/component/xlsx.full.min.js"></script>
  <script type="text/javascript" src="<?php echo $base_path; ?>/js/component/FileSaver.js"></script>
  <script type="text/javascript" src="<?php echo $base_path; ?>/js/component/moment-with-locales.js"></script>
  <script type="text/javascript" src="<?php echo $base_path; ?>/js/component/lodash.min.js"></script>
  <script type="text/javascript">
    localStorage.clear();
    Ext.onReady(function() {
      var currentDomain = '<?php echo $base_path; ?>';
      Ext.Loader.setConfig({
        enabled: true
      });
      Ext.Loader.setPath("COMP", currentDomain + "/components");
      Ext.Loader.setPath("POPUP", currentDomain + "/APP/ACLASS");
      Ext.Loader.setPath("APP_PATH", currentDomain + "/APP");
      Ext.Loader.setPath("Ext.ux", currentDomain + "/js/ux");


      Ext.define("vconfig", {
        singleton: true,
        LOG: {},
        verify: {},
        setting: {},
        getstyle: currentDomain + "/style/",
        basepath: currentDomain,
        keyemail: <?php echo json_encode($keyemail); ?>,
        token: <?php echo json_encode($token); ?>,
        poheader: <?php echo json_encode($poheader); ?>,
        poitem: <?php echo json_encode($poitem); ?>,
        profile: <?php echo json_encode($profile); ?>,
        //service_main: "http://devel.tdkreasi.com:81/bps_suai/apservice/home/",
        //service_url: "http://devel.tdkreasi.com:81/bps_suai/apservice/home/auth/",
        //service_api: "http://devel.tdkreasi.com:81/bps_suai/apservice/home/api/",
        base_url: currentDomain,
        service_main: currentDomain + "/apservice/home/",
        service_url: currentDomain + "/apservice/home/auth_byemail/",
        service_api: currentDomain + "/apservice/home/api/",
      });


      Ext.application({
        name: "TDK",
        pid: 'mainpage',
        appFolder: currentDomain + "/APP",
        autoCreateViewport: "TDK.MODEMAIL.approval_po.approval_po",
        requires: [
          "vconfig",
          "COMP.run",
          "COMP.download",
          "COMP.modulearray",
          "COMP.config",
          "COMP.CurrencyField",
          "COMP.SearchField",
          "COMP.monthfield",
          "COMP.FilterField.filters.Filter",
          "COMP.FilterField.button.OperatorButton",
          "COMP.TipToast",
          "TDK.Cmainpage",
          "TDK.Vmainpage",
          "TDK.Vloginpage",
          "Ext.ux.BoxReorderer",
          "TDK.AGLOBAL.combo_term",
          "TDK.AGLOBAL.combo_department",
          "TDK.AGLOBAL.button_download",
          "TDK.AGLOBAL.button_showpdf",
        ],
        launch: function() {
          //var dtval = Ext.decode(vconfig.dtemail);
          console.log('launch');


        },
      });
    });
  </script>
</head>

<body></body>

</html>