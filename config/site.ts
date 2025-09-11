import { gwAI,gnAI } from './ai'
import { res } from './res'
import { com } from './com'
import { weekly} from './weekly'
import { jobs } from './jobs'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Lynk",
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
  gnAI,
  res,
  com,
  weekly,
  jobs
]
