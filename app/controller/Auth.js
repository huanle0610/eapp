Ext.define("Mis.controller.Auth", {
    extend: "Ext.app.Controller",
    requires: ["Mis.Auth"],
    refs: [{
        ref: "authHeaderForm",
        selector: "authHeaderForm"
    }],
    init: function() {
        this.control({
            "authHeaderForm, authForm": {
                mySpace: this.mySpace,
                login: this.login,
                logout: this.logout
            }
        });
    },
    afterTabsLaunch: function() {
        if (Mis.Auth.isLoggedIn()) {
            this.setLoggedIn()
        } else {
            this.setLoggedOut()
        }
    },
    login: function(e, username, pass, reme) {
        Mis.Auth.login({
            username: username,
            password: pass,
            remember: reme,
            success: this.setLoggedIn,
            failure: function(a) {
                e.showMessage(a)
            },
            scope: this
        })
    },
    logout: function(b) {
        Mis.Auth.logout(this.setLoggedOut, this)
    },
    setLoggedIn: function() {
        this.getAuthHeaderForm().showLoggedIn(Mis.Auth.getUser());
    },
    setLoggedOut: function() {
        this.getAuthHeaderForm().showLoggedOut();
        this.eachCmp("commentsListWithForm",
            function(b) {
                b.showAuthForm()
            });
        this.eachCmp("commentsList",
            function(b) {
                b.refresh()
            });
    },
    eachCmp: function(e, f, d) {
        Ext.Array.forEach(Ext.ComponentQuery.query(e), f, d)
    },
    mySpace:function(form, userName){
        console.log(form, userName);
    }
});