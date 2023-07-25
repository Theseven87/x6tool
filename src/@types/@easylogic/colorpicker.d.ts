declare module "@easylogic/colorpicker" {
    type opt = {
        
            color: string, // init color code 
            type : 'ColorPicker'|'sketch'|'palette', // or 'sketch',  default type is 'chromedevtool'
            outputFormat : string
        
    }
    type showOpt={
        left :number,
        top : number,
        hideDelay : number 
    }
    class ColorPicker{
        constructor(opt:opt)
        show(showOpt:showOpt,defaultColor:string,showCallback:Function,changeCallback:Function,hideCallback:Function)
    }
}