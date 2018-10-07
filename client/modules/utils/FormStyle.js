const Styles = {
    row: {
        width: '100%'
    },
    m1: {
        width: ''+((1*100)/12)+'%',
        float: 'left'
    },
    m2: {
        width: ''+((2*100)/12)+'%',
        float: 'left'
    },
    m3: {
        width: ''+((3*100)/12)+'%',
        float: 'left'
    },
    m4: {
        width: ''+((4*100)/12)+'%',
        float: 'left'
    },
    m5: {
        width: ''+((5*100)/12)+'%',
        float: 'left'
    },
    m6: {
        width: ''+((6*100)/12)+'%',
        float: 'left'
    },
    m7: {
        width: ''+((7*100)/12)+'%',
        float: 'left'
    },
    m8: {
        width: ''+((8*100)/12)+'%',
        float: 'left'
    },
    m9: {
        width: ''+((9*100)/12)+'%',
        float: 'left'
    },
    m10: {
        width: ''+((10*100)/12)+'%',
        float: 'left'
    },
    m11: {
        width: ''+((11*100)/12)+'%',
        float: 'left'
    },
    mw1: {
        width: ''+((1*100)/12)+'%'
    },
    mw2: {
        width: ''+((2*100)/12)+'%'
    },
    mw3: {
        width: ''+((3*100)/12)+'%'
    },
    mw4: {
        width: ''+((4*100)/12)+'%'
    },
    mw5: {
        width: ''+((5*100)/12)+'%'
    },
    mw6: {
        width: ''+((6*100)/12)+'%'
    },
    mw7: {
        width: ''+((7*100)/12)+'%'
    },
    mw8: {
        width: ''+((8*100)/12)+'%'
    },
    mw9: {
        width: ''+((9*100)/12)+'%'
    },
    mw10: {
        width: ''+((10*100)/12)+'%'
    },
    mw11: {
        width: ''+((11*100)/12)+'%'
    },
    headerStyle: {
        width: '33%',
        float: 'left'
    },
    clearBoth:{
        clear: 'both'
    },
    clearRight:{
        clear: 'right'
    },
    floatLeft:{
        float: 'left'
    },
    floatRight:{
        float: 'right'
    },
    textAlignLeft: {
        textAlign: 'left'
    },
    textAlignRight: {
        textAlign: 'right'
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    marginAuto: {
        margin: 'auto'
    },
    bgColor: {
        color: 'green'
    },
    centerDiv: {
      margin: 'auto',
      width: '50%'
    },
    iconButton: {
        paddingTop: '0px',
        paddingBottom: '0px',
        float: 'right'
    }
};

function Style(styleList){
    var compositStyle = {};
    styleList.forEach(function(style){
        compositStyle = Object.assign(compositStyle, Styles[style]);
    });
    return compositStyle;
}

export default Style;
