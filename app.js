var Mis = {
    otherProducts : null,
    data: {
        commentsUrl: 'run/auth'
    }
};

Ext.application({
    name: 'Mis',

    controllers: [
        'Auth',
        'Nav'
    ],

    autoCreateViewport: true
});