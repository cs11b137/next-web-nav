import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

const getInitial = (title: string) => {
  const t = (title ?? "").trim()
  return (t[0] || "?").toUpperCase()
}

// 根据字符串生成稳定的 HSL 背景色（同一个 title 永远同色）
const stringToHsl = (str: string, s = 65, l = 45) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  const h = Math.abs(hash) % 360
  return `hsl(${h} ${s}% ${l}%)`
}

export const HoverEffect = ({
  items,
  className
}: {
  items: {
    title: string
    description: string
    link: string
    icon: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // 记录每个 item 的 icon 是否加载失败（用 link 作为 key）
  const [iconFailed, setIconFailed] = useState<Record<string, boolean>>({})

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, idx) => {
        const failed = !!iconFailed[item.link]
        const noIcon = !item.icon || item.icon.trim().length === 0
        const showFallback = noIcon || failed
        const initial = getInitial(item.title)
        const bg = useMemo(() => stringToHsl(item.title || item.link), [item.title, item.link])

        return (
          <motion.div
            key={item.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Link
              href={item?.link}
              className="group relative block h-full w-full p-2"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              target="_blank"
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 block h-full w-full rounded-xl bg-accent"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                  />
                )}
              </AnimatePresence>

              <Card>
                <CardTitle>
                  {showFallback ? (
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: bg }}
                      aria-label={item.title}
                      title={item.title}
                    >
                      {initial}
                    </span>
                  ) : (
                    <Image
                      src={item.icon}
                      className="overflow-hidden rounded-full object-fill"
                      alt={item.title}
                      width={40}
                      height={40}
                      unoptimized
                      onError={() =>
                        setIconFailed((prev) => ({
                          ...prev,
                          [item.link]: true
                        }))
                      }
                    />
                  )}

                  {item.title}
                </CardTitle>

                <CardDescription>{item.description}</CardDescription>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

// 下面 Card/CardTitle/CardDescription 保持不变


export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-lg border bg-background p-2 shadow-md",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h4 className={cn("mt-2 flex items-center gap-3 font-bold tracking-wide", className)}>{children}</h4>
}
export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn("mt-4 text-sm leading-relaxed tracking-wide", className)}>{children}</p>
}
