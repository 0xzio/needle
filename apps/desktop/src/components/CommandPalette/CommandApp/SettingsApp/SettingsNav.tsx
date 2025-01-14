import { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Info, LayoutGridIcon, MessageCircle, Settings2 } from 'lucide-react'
import { SettingsNavType, useSettingsNav } from './useSettingsNav'

interface NavItemProps {
  type: SettingsNavType
  icon: ReactNode
}

function NavItem({ type, icon }: NavItemProps) {
  const { selected, setSelected } = useSettingsNav()

  return (
    <div
      className={cn(
        'px-2 py-2 rounded-md hover:bg-foreground/10 cursor-pointer flex items-center gap-2 text-sm',
        selected === type && 'bg-foreground/10',
      )}
      onClick={() => {
        setSelected(type)
      }}
    >
      {icon}
      <div>{type}</div>
    </div>
  )
}

export function SettingsNav() {
  return (
    <div className="w-40 h-full space-y-[1px]">
      <NavItem icon={<Settings2 size={20} />} type={SettingsNavType.General} />
      <NavItem
        icon={<LayoutGridIcon size={20} />}
        type={SettingsNavType.Extensions}
      />
      {/* <NavItem
        icon={<MessageCircle size={18} />}
        type={SettingsNavType.Feedback}
      /> */}
      <NavItem icon={<Info size={20} />} type={SettingsNavType.About} />
    </div>
  )
}
