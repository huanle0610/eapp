Ext.define("Mis.view.auth.BaseForm", {
    extend: "Ext.Component",
    requires: ["Mis.Tip", "Mis.Auth"],
    createLoginFormHtml: function() {
        return ['<form class="loginForm">', '<input class="username" type="text" name="username" placeholder="Username" />', '<input class="password" type="password" name="password" placeholder="Password" />', '<label><input type="checkbox" name="remember" /> Remember Me</label>', '<input class="submit" type="submit" value="Sign in" />', " or ", '<a class="register" href="' + Mis.Auth.getRegistrationUrl() + '" target="_blank">Register</a>', "</form>"].join("")
    },
    bindFormSubmitEvent: function() {
        this.getEl().down("form").on("submit", this.submitLogin, this, {
            preventDefault: true
        })
    },
    submitLogin: function(event, formDom) {
        var formElem = Ext.get(formDom);
        var j = formElem.down("input[name=username]").getValue();
        var i = formElem.down("input[name=password]").getValue();
        var l = formElem.down("input[name=remember]");
        var k = l ? !!(l.getAttribute("checked")) : false;
        this.fireEvent("login", this, j, i, k)
    },
    showMessage: function(c) {
        var d = this.getEl().down("input[type=submit]");
        Mis.Tip.show(c, d, "bottom")
    }
});