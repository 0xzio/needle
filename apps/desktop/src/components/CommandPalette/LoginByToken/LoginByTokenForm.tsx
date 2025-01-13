import { Controller } from 'react-hook-form'
import LoadingCircle from '@/components/icons/loading-circle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Box } from '@fower/react'
import { useLoginByTokenForm } from './useLoginByTokenForm'

export function LoginByTokenForm() {
  const form = useLoginByTokenForm()
  const { control, formState, loading } = form

  return (
    <Box as="form" onSubmit={form.onSubmit} column gap6 pt3>
      <Controller
        name="token"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input size="lg" placeholder="Your personal token" {...field} />
        )}
      />

      <Button
        type="submit"
        size="lg"
        w-100p
        disabled={loading || !formState.isValid}
      >
        {loading && <LoadingCircle />}
        <Box>Login</Box>
      </Button>
    </Box>
  )
}
