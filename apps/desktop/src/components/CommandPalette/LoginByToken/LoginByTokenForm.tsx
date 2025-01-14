import { Controller } from 'react-hook-form'
import LoadingDots from '@/components/icons/loading-dots'
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
        className="flex items-center gap-2"
        disabled={loading || !formState.isValid}
      >
        <Box>Login</Box>
        {loading && <LoadingDots />}
      </Button>
    </Box>
  )
}
