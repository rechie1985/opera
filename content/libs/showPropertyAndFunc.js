function ShowObjProperty(Obj) {
    var PropertyList = '';
    var PropertyCount = 0;
    for (var i in Obj) {
       // if (Obj.i != null)
        if(typeof Obj[i] === 'function')
             PropertyList = PropertyList + i + '()' +  '方法\r\n'; 
        else
            PropertyList = PropertyList + i + '属性\r\n';
    }
    console.log(PropertyList);
}