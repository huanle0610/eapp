var Mis = {
    otherProducts : null,
    data: {
        commentsUrl: 'run/auth'
    }
};
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true,
    paths:{
        'Ext.ux':'app/ux'
    }
});

var Ecq = function (selector, dn) {
    return Ext.ComponentQuery.query(selector, dn);
};
var Downq = function(selector, dn) { return Ecq(selector, dn)[0] };

Ext.application({
    name: 'Mis',

    controllers: [
        'Auth',
        'Nav'
    ],

    autoCreateViewport: true
});