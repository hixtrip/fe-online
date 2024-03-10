import type { App } from "vue";
import SvgIcon from "./svg-icon.vue";
import CollapseTransition from "./collapse-transition.vue";

function setUtilsComponents(app: App) {
  app.component("SvgIcon", SvgIcon);
  app.component("CollapseTransition", CollapseTransition);
}

export default setUtilsComponents;
