Ext.define("Mis.view.auth.HeaderForm", {
    extend: "Mis.view.auth.BaseForm",
    alias: "widget.authHeaderForm",
    requires: [],
    afterRender: function () {
        this.callParent(arguments);
        this.getEl().addListener("click", this.showLoginForm, this, {
            preventDefault: true,
            delegate: ".login"
        });
        this.getEl().addListener("click",
            function () {
                this.fireEvent("logout", this)
            },
            this, {
                preventDefault: true,
                delegate: ".logout"
            });
        this.getEl().addListener("click",
            function (e, dom) {
                this.fireEvent("mySpace", this, dom.innerHTML)
            },
            this, {
                preventDefault: true,
                delegate: ".uname"
            });
    },
    showLoginForm: function () {
        this.update(this.createLoginFormHtml());
        this.bindFormSubmitEvent()
    },
    showLoggedIn: function (d) {
        this.update("<div><span " + 'class="uname"' + ">" + d.userName + '</span> | <a href="#" class="logout">Logout</a></div>')
    },
    showLoggedOut: function () {
        this.update('<a href="#" class="login">Sign in / Register</a>')
    }
});