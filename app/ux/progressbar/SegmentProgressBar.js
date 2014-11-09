/**
 Ext.create('Ext.ux.progressbar.SegmentProgressBar', {
                        initValue: '0.7'
                    }),
 Ext.create('Ext.ux.progressbar.SegmentProgressBar', {
                        height: 35,
                        margin: '8',
                        ui: 'red',
                        value: '1'
                    }),
 */
Ext.define("Ext.ux.progressbar.SegmentProgressBar", {
    extend: 'Ext.ProgressBar',
    alias: 'widget.segmentprogressbar',

    width: 300,
    height: 20,
    updateFn: null,
    initComponent: function () {
        var me = this;
        Ext.util.CSS.swapStyleSheet(me.$className + '_css', 'app/ux/progressbar/css/SegmentProgressBar.css');
        me.updateFn = me.updateFn || function (bar, value, text) {
            if(!me.ui){
                if (value < 0.5) {
                    bar.setUI('green');
                } else if (value < 0.8) {
                    bar.setUI('blue');
                } else if (value < 0.9) {
                    bar.setUI('orange');
                } else {
                    bar.setUI('red');
                }
            }
        };
        me.listeners = {
            render: function (bar) {
                var height = bar.getHeight(); //bar.bar.parent().getHeight(true); // content height
                bar.bar.setStyle('height', height + 'px');
                bar.textEl.setStyle('height', height + 'px');
                bar.textEl.setStyle('line-height', height + 'px');
                if (this.initValue) {
                    this.updateProgress(this.initValue, this.text);
                }
            },
            update: me.updateFn
        };
        me.callParent(arguments);
    }
});