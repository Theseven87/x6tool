import { Graph, Cell } from '@antv/x6'
export default class X6Shortkeys {
  protected _graph;
  constructor(graph: Graph) {
    this._graph = graph
    this._initShortkeys()
  }

  private _initShortkeys() {
    //删除
    this._graph.bindKey('backspace', () => {
      this.removeCells()
    })

    //复制粘贴
    this._graph.bindKey(['meta+c', 'ctrl+c'], () => {
      this.copyCells()
    })
    this._graph.bindKey(['meta+v', 'ctrl+v'], () => {
      this.pasteCells()
    })


    // zoom
    this._graph.bindKey(['ctrl+shift++', 'meta+shift++'], () => {
      this.upZoom()
    })
    this._graph.bindKey(['ctrl+shift+-', 'meta+shift+-'], () => {
      this.downZoom()
    })


    //撤销/重做
    this._graph.bindKey(['meta+z', 'ctrl+z'], () => {
      this.undo()
    })
    this._graph.bindKey(['meta+y', 'ctrl+y'], () => {
      this.redo()
    })

    //zIndex
    this._graph.bindKey(['alt++', 'alt++'], () => {
      this.upZIndex()
    })
    this._graph.bindKey(['alt+-', 'alt+-'], () => {
      this.downZIndex()
    })
    this._graph.bindKey(['ctrl+alt++', 'meta+alt++'], () => {
      this.toFront()
    })
    this._graph.bindKey(['ctrl+alt+-', 'meta+alt+-'], () => {
      this.toBack()
    })
  }

  protected removeCells(cell?: Cell[]) {
    if (cell && cell.length) {
      this._graph.removeCells(cell)
    } else {
      const cells = this._graph.getSelectedCells()
      if (cells.length) {
        this._graph.removeCells(cells)
      }
    }
  }

  protected copyCells(cell?: Cell[]) {
    if (cell && cell.length) {
      this._graph.copy(cell)
    } else {
      const cells = this._graph.getSelectedCells()
      if (cells.length) {
        this._graph.copy(cells)
      }
    }
  }

  protected pasteCells(options?: { x: number, y: number }) {
    if (!this._graph.isClipboardEmpty()) {
      let cells;
      if (options && !isNaN(options.x) && !isNaN(options.y)) {
        cells = this._graph.paste()
        if (cells.length && cells.length == 1) {
          cells[0]!.setProp('position', { x: options.x, y: options.y })
        }
      } else {
        cells = this._graph.paste({ offset: 32 })
      }
      this._graph.cleanSelection()
      this._graph.select(cells)
    }
    return false
  }

  protected upZoom() {
    const zoom = this._graph.zoom()
    if (zoom < 5) {
      this._graph.zoom(0.1)
    }
  }

  protected downZoom() {
    const zoom = this._graph.zoom()
    if (zoom > 0.5) {
      this._graph.zoom(-0.1)
    }
  }

  protected undo() {
    if (this._graph.canUndo()) {
      this._graph.undo()
    }
    return false
  }

  protected redo() {
    if (this._graph.canRedo()) {
      this._graph.redo()
    }
    return false
  }

  protected upZIndex(cell?: Cell): void {
    let obj;
    if (cell) {
      obj = cell
    } else {
      const cells = this._graph.getSelectedCells()
      if (cells.length) {
        obj = cells[0]
      }
    }

    if (obj) {
      const zIndex = obj.zIndex as number
      const maxIndex = this._graph.getCellCount()
      if (zIndex < maxIndex) {
        obj.setZIndex(zIndex + 1)
      }
    }
  }

  protected downZIndex(cell?: Cell): void {
    let obj;
    if (cell) {
      obj = cell
    } else {
      const cells = this._graph.getSelectedCells()
      if (cells.length) {
        obj = cells[0]
      }
    }

    if (obj) {
      const zIndex = obj.zIndex as number
      if (zIndex > 0) {
        obj.setZIndex(zIndex - 1)
      }
    }
  }

  protected toFront(cell?: Cell): void {
    let obj;
    if (cell) {
      obj = cell
    } else {
      const cells = this._graph.getSelectedCells()
      if (cells.length) {
        obj = cells[0]
      }
    }
    if (obj) {
      obj.toFront()
    }

  }

  protected toBack(cell?: Cell): void {
    let obj;
    if (cell) {
      obj = cell
    } else {
      const cells = this._graph.getSelectedCells()
      if (cells.length) {
        obj = cells[0]
      }
    }
    if (obj) {
      obj.toBack()
    }

  }

  protected exportSVG() {
    this._graph.exportSVG('chart', {
      beforeSerialize: function (this, svg) {
        const viewport = svg.querySelector('.x6-graph-svg-viewport')
        viewport?.setAttribute('transform', 'matrix(0.7,0,0,0.7,0,90)')
      }
    })
  }
  protected exportPNG() {
    this._graph.exportPNG()
  }

  protected exportJPEG() {
    this._graph.exportJPEG()
  }
}