export default class TabPanel extends HTMLElement {
    // 在 CTab 中创建选项卡时将设置索引
    public index: number;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<slot></slot>';
    }
}

customElements.define('tab-panel', TabPanel);

