
export default class CommonTable extends HTMLElement {
    private _columns: string[] = [];
    private _data: any[] = [];

    // 观察两个属性 'columns' 和 'data'
    static get observedAttributes() {
        return ['columns', 'data'];
    }

    /**
     * @description 当自定义元素首次被连接到文档DOM时被调用
     */
    connectedCallback() {
        this.render();
    }

    /**
     * @description 当自定义元素的一个属性被增加、移除或更改时被调用
     * @param name     属性名
     * @param oldValue 旧值
     * @param newValue 新值
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'columns':
                    this._columns = JSON.parse(newValue);
                    break;
                case 'data':
                    this._data = JSON.parse(newValue);
                    break;
            }
            this.render();
        }
    }

    /**
     * @description 渲染函数
     */
    render() {
        // 清除旧的内容
        this.innerHTML = '';
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const theadRow = document.createElement('tr');

        table.setAttribute('border', 1);

        // 创建表头
        this._columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column;
            theadRow.appendChild(th);
        });

        thead.appendChild(theadRow);
        table.appendChild(thead);

        // 创建表格内容
        this._data.forEach(rowData => {
            const tr = document.createElement('tr');
            this._columns.forEach(column => {
                const td = document.createElement('td');
                td.textContent = rowData[column] || '';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        this.appendChild(table);
    }
}

if (!customElements.get('common-table')) {
    customElements.define('common-table', CommonTable);
}
