import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@fower/react'
import { produce } from 'immer'
import { Checkbox, Input } from 'uikit'
import { useActiveSpace } from '@penx/hooks'
import { db } from '@penx/local-db'
import { FormField } from './FormField'

interface Props {
  schema: any
  extensionId: string
}

export const ExtensionSettingsForm = ({ schema, extensionId }: Props) => {
  const { activeSpace } = useActiveSpace()

  const { handleSubmit, watch, control } = useForm<any>({
    defaultValues: {},
  })

  const values = watch()

  useEffect(() => {
    // const settings = produce(activeSpace.settings, (draft) => {
    //   if (!draft.extensions) draft.extensions = {}
    //   if (!draft.extensions?.[extensionId]) {
    //     draft.extensions[extensionId] = {}
    //   }
    //   draft.extensions[extensionId] = values
    // })
    // db.updateSpace(activeSpace.id, { settings })
  }, [values, activeSpace, extensionId])

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('data:', data)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} column p8 w-100p>
      {schema.map((item: any) => {
        if (item.component === 'Checkbox') {
          return (
            <FormField
              key={item.name}
              label={item.label}
              description={item.description}
            >
              <Controller
                name={item.name}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox {...field} checked={!!field.value} />
                )}
              />
            </FormField>
          )
        }

        return (
          <FormField
            key={item.name}
            label={item.label}
            description={item.description}
          >
            <Controller
              name={item.name}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input placeholder={item.placeholder || ''} {...field} w-100p />
              )}
            />
          </FormField>
        )
      })}
    </Box>
  )
}
