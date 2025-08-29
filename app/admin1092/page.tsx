"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Trash2, PlusCircle, RotateCcw } from "lucide-react"
import { useConfigStore, NavCategory, NavLinkItem, initialNavData } from "@/stores"
import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const SettingDialog = () => {
  const categories = useConfigStore((state) => state.categories)
  const [open, setOpen] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [localCategories, setLocalCategories] = useState<NavCategory[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      async function fetchData() {
        const issues = await loadFromIssue()
        setLocalCategories(issues)
        setIsResetting(false)
      }
      fetchData()
    }
  }, [open, categories])

  const handleCategoryChange = (index: number, field: keyof NavCategory, value: string) => {
    const updated = [...localCategories]
    updated[index] = { ...updated[index], [field]: value }
    setLocalCategories(updated)
  }

  const handleLinkChange = (catIndex: number, linkIndex: number, field: keyof NavLinkItem, value: string) => {
    const updated = [...localCategories]
    const updatedItems = [...updated[catIndex].items]
    updatedItems[linkIndex] = { ...updatedItems[linkIndex], [field]: value }
    updated[catIndex] = { ...updated[catIndex], items: updatedItems }
    setLocalCategories(updated)
  }

  const handleAddCategory = () => {
    setLocalCategories([...localCategories, { title: "新分类", items: [] }])
  }

  const handleRemoveCategory = (index: number) => {
    setLocalCategories(localCategories.filter((_, i) => i !== index))
  }

  const handleAddLink = (catIndex: number) => {
    const updated = [...localCategories]
    updated[catIndex] = {
      ...updated[catIndex],
      items: [...updated[catIndex].items, { icon: "", title: "新链接", desc: "", link: "" }]
    }
    setLocalCategories(updated)
  }

  const handleRemoveLink = (catIndex: number, linkIndex: number) => {
    const updated = [...localCategories]
    updated[catIndex] = {
      ...updated[catIndex],
      items: updated[catIndex].items.filter((_, i) => i !== linkIndex)
    }
    setLocalCategories(updated)
  }

  const handleSave = () => {
    // useConfigStore.setState({ categories: localCategories })
    saveToIssue({ categories: localCategories })
    toast({
      title: "保存成功",
      description: "所有更改已保存并生效。",
      duration: 3000
    })
    setOpen(false)
  }

  const handleCancel = () => {
    setLocalCategories(JSON.parse(JSON.stringify(categories)))
    setOpen(false)
  }

  async function saveToIssue(content: object) {
    const repo = "cs11b137/next-web-nav"
    const issueNumber = 1 // 你要存的 issue 编号
		const t=atob('Z2l0aHViX3BhdF8xMUFDNk9FNFEwajFpa3dac1g3SXAzXzdOMTRjZzNISkVaYmt6dWpCYlh5cFMzajF2OWFuWGtDcWxCRlkydm8xV01CRzNCTkVGRnl0MUVDWUE0')

    const resp = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}`, {
        method: "PATCH",
        headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        body: JSON.stringify(content, null, 2) // 把对象转成字符串
        })
    })

    return await resp.json()
    }

async function loadFromIssue() {
  const repo = "cs11b137/next-web-nav"
  const issueNumber = 1
	const t=atob('Z2l0aHViX3BhdF8xMUFDNk9FNFEwajFpa3dac1g3SXAzXzdOMTRjZzNISkVaYmt6dWpCYlh5cFMzajF2OWFuWGtDcWxCRlkydm8xV01CRzNCTkVGRnl0MUVDWUE0')

  const resp = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}`, {
    headers: {
      Authorization: `Bearer ${t}`
    }
  })

  const data = await resp.json()
  return JSON.parse(data.body) // 把 issue body 解析成对象
}


  const handleResetClick = () => {
    if (!isResetting) {
      setIsResetting(true)
      toast({
        title: "确认重置数据？",
        description: "再次点击重置按钮将恢复到初始状态，此操作不可撤销。",
        duration: 5000,
        variant: "destructive"
      })
      return
    }

    setLocalCategories(JSON.parse(JSON.stringify(initialNavData)))
    setIsResetting(false)
    toast({
      title: "重置成功",
      description: "数据已恢复到初始状态。",
      duration: 3000
    })
  }

  return (
    <div className="flex h-[100vh] flex-col rounded-lg border border-border bg-card text-card-foreground mx-auto px-4 sm:max-w-[640px]">
      {/* Header */}
      <div className="flex-shrink-0 space-y-1.5 border-b border-border pb-4 pt-6">
        <h1 className="text-xl font-semibold tracking-tight">编辑网站数据</h1>
        <p className="text-sm text-muted-foreground">
          在这里修改网站导航的数据。点击保存按钮后，所有更改将立即生效。
        </p>
      </div>

      {/* Body */}
      <ScrollArea className="flex-grow py-6 pr-6">
        <Accordion type="multiple" className="w-full space-y-4">
          {localCategories.map((category, catIndex) => (
            <AccordionItem
              value={`item-${catIndex}`}
              key={catIndex}
              className="rounded-lg border border-border shadow-sm transition-colors hover:bg-accent/5"
            >
              <div className="flex w-full items-center px-4">
                <AccordionTrigger className="flex-1 py-4 text-left hover:no-underline [&>svg]:hidden">
                  <Input
                    value={category.title}
                    onChange={(e) => handleCategoryChange(catIndex, "title", e.target.value)}
                    className="w-full border-none bg-transparent p-0 text-base font-medium shadow-none focus-visible:ring-0"
                    onClick={(e) => e.stopPropagation()}
                    placeholder="输入分类名称"
                  />
                </AccordionTrigger>
                <div className="ml-auto flex items-center pl-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveCategory(catIndex)
                    }}
                    className="h-7 w-7 flex-shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <AccordionTrigger className="p-2 hover:no-underline" />
                </div>
              </div>
              <AccordionContent className="pb-4 pl-6 pr-2 pt-2">
                <div className="space-y-4">
                  {category.items.map((item: any, linkIndex: number) => (
                    <div
                      key={linkIndex}
                      className="relative grid grid-cols-1 gap-3 rounded-md border border-border bg-card/50 p-4 shadow-sm transition-colors hover:bg-accent/5"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveLink(catIndex, linkIndex)}
                        className="absolute right-2 top-2 h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="grid grid-cols-4 items-center gap-y-3 gap-x-3 pr-8">
                        <Label className="text-sm font-medium text-muted-foreground">图标 URL</Label>
                        <Input
                          value={item.icon}
                          onChange={(e) => handleLinkChange(catIndex, linkIndex, "icon", e.target.value)}
                          className="col-span-3 h-8 text-sm"
                          placeholder="输入图标链接"
                        />

                        <Label className="text-sm font-medium text-muted-foreground">标题</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => handleLinkChange(catIndex, linkIndex, "title", e.target.value)}
                          className="col-span-3 h-8 text-sm"
                          placeholder="输入网站标题"
                        />

                        <Label className="text-sm font-medium text-muted-foreground">描述</Label>
                        <Input
                          value={item.desc}
                          onChange={(e) => handleLinkChange(catIndex, linkIndex, "desc", e.target.value)}
                          className="col-span-3 h-8 text-sm"
                          placeholder="输入网站简短描述"
                        />

                        <Label className="text-sm font-medium text-muted-foreground">链接 URL</Label>
                        <Input
                          value={item.link}
                          onChange={(e) => handleLinkChange(catIndex, linkIndex, "link", e.target.value)}
                          className="col-span-3 h-8 text-sm"
                          placeholder="输入网站链接"
                        />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => handleAddLink(catIndex)}>
                    <PlusCircle className="mr-1.5 h-4 w-4" />
                    添加链接
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button className="mt-4" variant="outline" onClick={handleAddCategory}>
          <PlusCircle className="mr-1.5 h-4 w-4" />
          添加分类
        </Button>
      </ScrollArea>

      {/* Footer */}
      <div className="flex-shrink-0 flex-col-reverse gap-2 border-t border-border py-4 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={handleCancel}>
          取消
        </Button>
        <Button onClick={handleSave}>保存更改</Button>
      </div>
    </div>
  )
}

export default SettingDialog
