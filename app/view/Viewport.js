Ext.define('Mis.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',

    requires: [
        'Mis.view.Header',
        "Mis.view.auth.HeaderForm"
    ],

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            layout: 'border',
            items: [
                {
                    region: 'north',
                    id: "north-region",
                    xtype: "container",
                    height: 128,
                    layout: {
                        type: "vbox",
                        align: "stretch"
                    },
                    items: [
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [
                                {
                                    xtype: "docheader"
                                },
                                {
                                    xtype: "container",
                                    flex: 1
                                },
                                {
                                    id: "loginContainer",
                                    xtype: "authHeaderForm",
                                    width: 500,
                                    padding: "10 20 0 0"
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    collapsible: true,
                    title: 'Navigation',
                    width: 150
                    // could use a TreePanel or AccordionLayout for navigational items
                },
                {
                    region: 'south',
                    title: 'South Panel',
                    collapsible: true,
                    html: 'Information goes here',
                    split: true,
                    height: 100,
                    minHeight: 100
                },
                {
                    region: 'east',
                    title: 'East Panel',
                    collapsible: true,
                    split: true,
                    width: 150
                },
                {
                    region: 'center',
                    xtype: 'tabpanel', // TabPanel itself has no title
                    activeTab: 0,      // First tab active by default
                    items: {
                        title: 'Default Tab',
                        html: 'The first tab\'s content. Others may be added dynamically'
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});