import { Graph } from '@antv/x6';
function registerEdge() {
    Graph.registerEdge('dag-edge', {
        inherit: 'edge',
        attrs: {
            line: {
                stroke: '#C2C8D5',
                strokeWidth: 2,
                targetMarker: null,
            },
        },
    }, true);
}
function inserCss() {
    document.head.insertAdjacentHTML('beforeend', `<style type="text/css">
            .containerBox{
                width:100%;
            }
            .x6-graph-scroller::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            
            .x6-graph-scroller::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 1px;
                background-color: rgba(28, 110, 196, 0.52);
            }
            
            .x6-graph-scroller::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
                background: transparent;
            }
             
            .x6-edge-selected >path:nth-child(2){
                stroke: #1890ff;
                stroke-width: 1.5px !important;
            }

            .x6Tool-contextMenu {
                width: 11rem;
                position: absolute;
                z-index: 999;
                visibility: hidden;
                border: 1px solid #e5e5e5;
                background: #eeeeee;
                padding: 10px 0;
                box-shadow: 2px 2px 6px 1px #999;
            }
            
            .x6Tool-contextMenu>ul{
                margin: 0;
                padding: 0;
            }
            .x6Tool-contextMenu>ul>li{
                width: 100%;
                height: 30px;
                padding: 0 10px;
                line-height: 30px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
            }
            .x6Tool-contextMenu>ul>li:hover{
                background: #aaaaaa;
            }
            .x6Tool-contextMenu>ul>li>span{
                pointer-events: none;
            }
            .x6Tool-contextMenu>ul>li>span.shortkey{
                color: #999999;
            }

            .toolbarContainer{
                width: 100%;
                height: 2rem;
                line-height: 2rem;
                border: 1px solid #cccccc;
                box-shadow: 5px 1px 5px 0px #999999;
                background-color: #ffffff;
                position: absolute;
                top:0;
                z-index: 99;
                display: flex;
                align-items: center;
                padding:0 10px;
            }
            .toolbarContainer>.toolBox{
                position:relative;
                width:24px;
                height:24px;
                margin-right: 4px;
            }
            .toolBox>img{
                width:24px;
                height:24px;
                cursor: pointer;
                opacity:0.5;
                transition:0.5s;
                
            }
            .toolBox>img:hover+span{
                
                visibility: visible;
            }
            .toolBox>img:hover{
                opacity:1;
            }
            .toolBox:hover .toolMenu{
                visibility: visible;
            }
            .toolBox>span{
                visibility: hidden;
                width: 37px;
                text-align: center;
                display: block;
                background: #000;
                color: #fff;
                height: 24px;
                line-height: 24px;
                border-radius: 5px;
                pointer-events: none;
            }
            .toolBox>.toolMenu{
                position: absolute;
                top: 24px;
                visibility: hidden; 
                display: block;
                width: 88px;
                border: 1px solid #e5e5e5;
                background: #eeeeee;
                box-shadow: 2px 2px 6px 1px #999;
            }
            .toolBox>.toolMenu>li{
                cursor: pointer;
                height:28px;
                line-height:28px;
                padding: 0 10px;
            }
            .toolBox>.toolMenu>li:hover{
                background: #aaaaaa;
            }
        </style>`);
}
export { registerEdge, inserCss };
