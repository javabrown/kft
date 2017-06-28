/*require.config({
    paths: {
        'jquery': 'vendor/jquery',
        'raphael': '//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min'
    }
});*/


require([
    'fskytree/tree',
    'fskytree/plugin/actions',
    'fskytree/plugin/overlay',
    'fskytree/plugin/camomile',
    'fskytree/plugin/history'
    ], function(FskyTree, Actions, Overlay, Camomile, History) {

    var fskyTree = new FskyTree();

    fskyTree.plugin(Actions);
    fskyTree.plugin(Overlay);
    fskyTree.plugin(Camomile);
    fskyTree.plugin(History, {handlerUrl: 'tree2.json'});

    fskyTree.load('tree.json');

    $(fskyTree).on('tree/ready', function(){
        this.render();
    });

    $(fskyTree).on('tree/error', function(e, error){
        alert('Tree error!');
    });

    $(fskyTree).on('tree/member/add/son', function(e, member){
        alert(member.lastname);
    });

});
