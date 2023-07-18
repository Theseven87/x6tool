# x6tool
基于[AntX6](https://x6.antv.antgroup.com/)封装的拓扑图编辑器

## 使用方式

- 安装
```js
npm install x6tool --save
```

- 引用
```js
import x6tool from 'x6tool'
```

## 初始化

```typescript
    const containder = document.getElementById('container') as HTMLElement
    graph = new x6tool(containder,options)
```

- options参数说明  
options为可选参数
```typescript
{
    minimap: boolean, //是启用小地图
    edit:boolean    //是否为编辑模式，编辑模式可以对画布上的元素进行编辑
}
```

- 获取grpah实例
```js
const instance = graph.getInstance()
```
instance为Graph的实例对象，关于Graph的方法请参考[AntX6](https://x6.antv.antgroup.com/)

## 关于左侧元素面板(Stencil)
```typescript
type groupData= {
    id: string;
    name: string; //分组名称
    datas: {
        id: string;
        label: string; //元素名称
        file: string; //元素的图片地址
    }[];
}[]

graph.initStencil(groupData)
```

## 关于导出
目前新增空白区域右键菜单选择导出或者顶部工具条导出(svg,png,jpeg),均使用官方导出插件，但是svg导出transform设置异常，已在代码中进行处理，待测试

## 新增功能
 ### 2023-07-12 
 - 增加工具条  
 - 连线增加路径点拖动工具及删除工具  

 ### 2023-07-14
 - 增加数据导出（导出数据分为简易数据和完成数据。简易数据会取消attrs等与业务无关数据；）
 - 增加数据导入，将json数据直接在画布中呈现做回显

 ### 2023-07-18
 **修复平移画布元素显示不全的问题**


