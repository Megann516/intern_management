Ext.define("TDK.mainpage", {
  extend: "Ext.panel.Panel",
  id: "mainpage",
  alias: "widget.mainpage",
  pid: "mainpage",
  requires: [
    //
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
  ],
  controller: "Cmainpage",
  layout: "card",
  border: false,
  frame: false,
  pid: "panelmainpage",
  items: [
    //
    { xtype: "Vloginpage" }, 
    { xtype: "Vmainpage" }
  ],
});
