Ext.define('Ext.ux.WebUploader', {
    alias: 'widget.webuploader',

    extend: 'Ext.panel.Panel',

    fileNumLimit: 300,
    fileSizeLimit: 200 * 1024 * 1024,    // 200 M
    fileSingleSizeLimit: 50 * 1024 * 1024,    // 50 M

    initComponent: function() {
        var me = this;
        // load third lib
        me.loadLib();

        var toolbar = [
            {
                xtype: 'checkbox',
                boxLabel: '启用拖入区域',
                checked: true,
                itemId: 'dragZoneOn'
            }
        ];

        Ext.apply(this, {
            tbar: toolbar,
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    cls: 'webuploader',
                    itemId: 'dragZone',
                    padding: '15 20',
                    loader: {
                        autoLoad: true,
                        url: 'app/lib/webuploader/tpl.html',
                        renderer: 'html'
                    }
                },
                {
                    html: 'abcd'
                },
                Ext.create('Ext.ux.progressbar.SegmentProgressBar', {
                    height: 35,
                    margin: '8',
                    ui: 'green',
                    value: '1',
                    initValue: '0.7'
                })
            ]
        });
        this.callParent();
    },

    afterLayout: function(){
        var me = this;
        var dragZone = me.down('#dragZone');
        me.down('#dragZoneOn').on({
           change: function(cmp){
               if(cmp.checked) {
                   dragZone.show();
               } else {
                   dragZone.hide();
               }
           }
        });

        me.pasteId = me.getEl().id;
        me.dnd = Ext.get(me.getEl().query('.placeholder')[0]);
        me.pick = Ext.get(me.getEl().query('.mypick')[0]);
    },

    loadLib: function(){
        var me = this;
        var loadErrorFn = function() {          // callback fn if load fails
            console.log(arguments);
        };
        // load css
        Ext.util.CSS.swapStyleSheet(
            'uploader_css', 'app/lib/webuploader/uploader.css'
        );
        // load jquery and webuploader
        Ext.Loader.loadScript({
            url: 'app/lib/webuploader/jquery.js',                    // URL of script
            scope: this,                   // scope of callbacks
            onLoad: function() {           // callback fn when script is loaded
                console.log('jQuery: ' + $.fn.jquery);
                me.hasJquery = true;
                Ext.Loader.loadScript({
                    url: 'app/lib/webuploader/webuploader.js',                    // URL of script
                    scope: this,                   // scope of callbacks
                    onLoad: function() {           // callback fn when script is loaded
                        console.log('WebUploader: ' + WebUploader.version);
                        me.hasWebUploader = true;
                        me.initUploader();
                    },
                    onError: loadErrorFn
                });
            },
            onError: loadErrorFn
        });
    },

    initUploader: function(){
        var me = this;
        // 实例化
        me.uploader = WebUploader.create({
            pick: {
                id: '#'+ me.pick.id,
                label: '点击选择图片'
            },
            formData: {
                uid: 123
            },
            dnd: '#'+ me.dnd.id,
            paste: '#'+ me.pasteId,
            swf: '../../dist/Uploader.swf',
            chunked: false,
            chunkSize: 512 * 1024,
            server: '../../server/fileupload.php',
            // runtimeOrder: 'flash',

            // accept: {
            //     title: 'Images',
            //     extensions: 'gif,jpg,jpeg,bmp,png',
            //     mimeTypes: 'image/*'
            // },

            // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
            disableGlobalDnd: true,
            fileNumLimit: me.fileNumLimit,
            fileSizeLimit: me.fileSizeLimit,    // 200 M
            fileSingleSizeLimit: me.fileSingleSizeLimit    // 50 M
        });
        me.bindEvent();
    },

    bindEvent: function(){
        var me = this;
        var uploader = me.uploader;
        // 文件置入对列时
        uploader.onFileQueued = function (file) {
            console.log(file);
//            fileCount++;
//            fileSize += file.size;
//
//            if (fileCount === allowMaxCount) {
//                $placeHolder.addClass('element-invisible');
//            }
//            $statusBar.show();
//
//            addFile(file);
//            setState('ready');
//            updateTotalProgress();
        };
/*        // 文件上传进度
        uploader.onUploadProgress = function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            $percent.css('width', percentage * 100 + '%');
            percentages[ file.id ][ 1 ] = percentage;
            updateTotalProgress();
        };

        // 文件从对列中移除
        uploader.onFileDequeued = function (file) {
            fileCount--;
            fileSize -= file.size;

            if (!fileCount) {
                setState('pedding');
            }

            removeFile(file);
            updateTotalProgress();

        };

        uploader.on('all', function (type) {
            var stats;
            switch (type) {
                case 'uploadFinished':
                    setState('confirm');
                    break;

                case 'startUpload':
                    setState('uploading');
                    break;

                case 'stopUpload':
                    setState('paused');
                    break;

            }
        });*/

        uploader.onError = function () {
            console.log(arguments);
            var text;
            switch (arguments[0]) {
                case 'Q_EXCEED_SIZE_LIMIT':
                    text = '文件大小超出' ;
                    break;

                case 'Q_EXCEED_NUM_LIMIT':
                    text = '文件数量超出，最多允许 ' + me.fileNumLimit + '个文件';
                    break;
                case 'F_DUPLICATE':
                    text = '文件重复';
                    break;
            }
            Ext.Msg.alert('Error', text);
        };
    }
});