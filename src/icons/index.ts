import type { App } from "vue"
import SvgIcon from "@/components/SvgIcon/svgIcon.vue"
import "virtual:svg-icons-register"

export function loadSvg (app: App) {
  app.component("SvgIcon", SvgIcon)
}
