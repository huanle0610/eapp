Ext.define("Mis.Auth", {
    singleton: true,
    requires: ["Ext.Ajax", "Ext.util.Cookies"],
    init: function(f) {
        Ext.Ajax.request({
            url: Mis.data.commentsUrl + "/session",
            params: {
                sid: this.getSid()
            },
            method: "GET",
            cors: true,
            callback: function(g, a, h) {
                if (h && h.responseText) {
                    var b = Ext.JSON.decode(h.responseText);
                    if (b && b.sessionID) {
                        this.setSid(b.sessionID)
                    }
                    if (b && b.userName) {
                        this.currentUser = b;
                    }
                } else {
                }
                f();
            },
            scope: this
        })
    },
    login: function(b) {
        Ext.Ajax.request({
            url: Mis.data.commentsUrl + "/login",
            method: "POST",
            cors: true,
            params: {
                username: b.username,
                password: b.password
            },
            callback: function(h, f, a) {
                var g = Ext.JSON.decode(a.responseText);
                if (g.success) {
                    this.currentUser = g;
                    this.setSid(g.sessionID, b.remember);
                    b.success && b.success.call(b.scope)
                } else {
                    b.failure && b.failure.call(b.scope, g.reason)
                }
            },
            scope: this
        })
    },
    logout: function(c, d) {
        Ext.Ajax.request({
            url: Mis.data.commentsUrl + "/logout?sid=" + this.getSid(),
            method: "POST",
            cors: true,
            callback: function() {
                this.currentUser = undefined;
                c && c.call(d)
            },
            scope: this
        })
    },
    setSid: function(sid, rem) {
        this.sid = sid;
        if (sid) {
            var e = null;
            if (rem) {
                e = new Date();
                e.setTime(e.getTime() + (60 * 60 * 24 * 30 * 1000))
            }
            Ext.util.Cookies.set("sid", sid, e)
        } else {
            Ext.util.Cookies.clear("sid")
        }
    },
    getSid: function() {
        if (!this.sid) {
            this.sid = Ext.util.Cookies.get("sid")
        }
        return this.sid
    },
    getUser: function() {
        return this.currentUser
    },
    isLoggedIn: function() {
        return !! this.getUser()
    },
    isModerator: function() {
        return this.getUser() && this.getUser().mod
    },
    getRegistrationUrl: function() {
        return Mis.data.commentsUrl + "/register"
    }
});