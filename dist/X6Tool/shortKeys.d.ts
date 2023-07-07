import { Graph, Cell } from '@antv/x6';
export default class X6Shortkeys {
    protected _graph: Graph;
    constructor(graph: Graph);
    private initShortkeys;
    protected removeCells(cell?: Cell[]): void;
    protected copyCells(cell?: Cell[]): void;
    protected pasteCells(options?: {
        x: number;
        y: number;
    }): boolean;
    protected upZoom(): void;
    protected downZoom(): void;
    protected undo(): boolean;
    protected redo(): boolean;
    protected upZIndex(cell?: Cell): void;
    protected downZIndex(cell?: Cell): void;
    protected toFront(cell?: Cell): void;
    protected toBack(cell?: Cell): void;
}
