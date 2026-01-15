import { gwAI } from './ai'
import { res } from './res'
import { com } from './com'
import { weekly} from './weekly'
import { jobs } from './jobs'
import { tool } from './tool'
import { dres } from './dres'
import { apiRes } from './api'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "NaviKit",
  description: "基于 Next.js 的前端导航网站",
  mainNav: [],
  links: {
    twitter: "https://twitter.com/liwenka1",
    github: "https://github.com/liwenka1/next-web-nav"
  }
}

export interface NavLink {
  /** 站点图标 */
  icon: string
  /** 站点名称 */
  title: string
  /** 站点名称 */
  desc: string
  /** 站点链接 */
  link: string
}

type NavData = {
  title: string
  items: NavLink[]
}

export const NavData: NavData[] = [
  gwAI,
  res,
  com,
  weekly,
  jobs,
  tool,
  dres,
  apiRes
]
