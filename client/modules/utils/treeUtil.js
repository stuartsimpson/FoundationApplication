var treeUtil = {};

treeUtil.initalize = (rootBranch) => {
    return([{
            name:rootBranch? rootBranch:'root',
            indexPath:'0',
            parentPath:'',
            hasChildren:true,
            children:[],
            isOpen:false
    }]);
};

treeUtil.findBranch = (tree, indexPath) => {
    var list = indexPath.split('.');
    var branch = {children: tree};
    list.forEach((i) => {
        if (branch.children.length > 0) {
            branch = branch.children[i];
        } else {
            console.log('Error traversing indexPath:' + indexPath + ' node: ' + i);
        }
    });
    return(branch);
};

treeUtil.openCloseBranch = (tree, indexPath)=> {
    var branch = treeUtil.findBranch(tree, indexPath);
    branch.isOpen = !branch.isOpen;
    return(tree);
};

treeUtil.addBranch = (tree, nodeListing, indexPath) => {
    var branch = treeUtil.findBranch(tree, indexPath);
    branch.isOpen = true;

    for (var i in nodeListing) {
        var node = nodeListing[i];
        node.indexPath = indexPath + '.' + i;
        branch.children.push(node);
    }
    return(tree);
};

export default treeUtil;
