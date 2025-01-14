import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Box } from '@fower/react'
import { Logo } from '@penx/widget'
import { LoginByTokenForm } from './LoginByTokenForm'

export const LoginByToken = () => {
  return (
    <div className="h-full w-full flex items-center justify-center pt-8">
      <div className="w-[400px]">
        <Box fontBold text3XL mb3 textCenter>
          Login to PenX
        </Box>

        <Box column toCenterX gap2 mb4>
          <Box className="text-foreground/60 text-center">
            Login to https://penx.io，get a token from user settings，then use
            token to login to App
          </Box>
        </Box>
        <div className="flex items-center gap-2">
          <div className="text-xs text-foreground/60">How to get a token:</div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xs">penx.io</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xs">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">
                  Access token
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <LoginByTokenForm />
      </div>
    </div>
  )
}
