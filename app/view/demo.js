Ext.define('Mis.view.Demo', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [
                {
                    html: 'hello'
                }
            ]
        });

        me.callParent(arguments);
    }
});