Ext.define('Mis.controller.Nav', {
    extend: 'Ext.app.Controller',

    models: [],
    stores: [],

    refs: [
//        {ref: 'reviewList',  selector: 'reviewlist'}
    ],

    init: function() {
        var me = this;

        me.control({
            'authHeaderForm': {
                render: function(){
                    Mis.Auth.init(function(){
                        Mis.getApplication().getController('Auth').afterTabsLaunch();
                    });
                }
            }
        });

    },

    onLaunch: function() {
    }
});