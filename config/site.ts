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
  {
    title: "社区",
    items: [
      {
        icon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a",
        title: "Stack Overflow",
        desc: "全球最大的技术问答网站",
        link: "https://stackoverflow.com"
      },
      {
        title: "稀土掘金",
        icon: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png",
        desc: "面向全球中文开发者的技术内容分享与交流平台",
        link: "https://juejin.cn"
      },
      {
        title: "V2EX",
        icon: "https://www.v2ex.com/static/icon-192.png",
        desc: "一个关于分享和探索的地方",
        link: "https://www.v2ex.com"
      },
      {
        title: "SegmentFault 思否",
        icon: "https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png",
        desc: "技术问答开发者社区",
        link: "https://segmentfault.com"
      },
      {
        title: "博客园",
        icon: "/icons/cnblogs.svg",
        desc: "博客园是一个面向开发者的知识分享社区",
        link: "https://www.cnblogs.com"
      },
      {
        title: "知乎",
        icon: "https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png",
        desc: "中文互联网高质量的问答社区和创作者聚集的原创内容平台",
        link: "https://zhihu.com"
      }
    ]
  }
]
