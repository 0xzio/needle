import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useThemeMode } from '@penx/hooks'

interface Props {}

export const ThemeModeSelect = ({}: Props) => {
  const { mode, setMode } = useThemeMode()
  const options = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' },
  ]
  return (
    <RadioGroup
      defaultValue={mode}
      className="flex items-center gap-4"
      onValueChange={(v: string) => {
        setMode(v)
      }}
    >
      {options.map((option, index) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`mode-${option.value}`} />
          <Label htmlFor={`mode-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
