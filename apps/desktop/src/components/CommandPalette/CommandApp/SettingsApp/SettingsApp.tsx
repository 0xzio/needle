import { About } from './About/About'
import { ExtensionSettings } from './ExtensionSettings/ExtensionSettings'
import { General } from './General/General'
import { SettingsNav } from './SettingsNav'
import { SettingsNavType, useSettingsNav } from './useSettingsNav'

export function SettingsApp() {
  const { selected } = useSettingsNav()
  return (
    <div className="flex gap-x-2">
      <SettingsNav />
      <div className="flex-1">
        {selected === SettingsNavType.General && <General />}
        {selected === SettingsNavType.About && <About />}
        {selected === SettingsNavType.Extensions && <ExtensionSettings />}
        {selected === SettingsNavType.Feedback && <General />}
      </div>
    </div>
  )
}
