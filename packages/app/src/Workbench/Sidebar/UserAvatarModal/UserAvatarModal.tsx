import React, { FC, useEffect } from 'react'
import { Box } from '@fower/react'
import { Eye, MoreHorizontal } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  Bullet,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTrigger,
} from 'uikit'
import { useUser } from '@penx/hooks'
import { IconDisconnect } from '@penx/icons'
import { getRandomColor } from '@penx/local-db'
import { useCopyToClipboard } from '@penx/shared'
import { QrCode } from './QrCode'

interface Props {}

export const UserAvatarModal: FC<Props> = () => {
  const { copy } = useCopyToClipboard()

  return (
    <Modal>
      <ModalTrigger asChild>
        <Box
          toCenterY
          toBetween
          cursorPointer
          textSM
          roundedFull
          bgZinc100--D4
          bgZinc200--hover
          h-48
          px3
          gap1
          gray500
        >
          <Box toCenterY gap1>
            <Bullet innerColor={getRandomColor()}></Bullet>
            {/* <Avatar>
              <AvatarFallback>{nickname}</AvatarFallback>
            </Avatar> */}
            {/* <Box>{nickname}</Box> */}
          </Box>
          {/* <MoreHorizontal size={20} /> */}
        </Box>
      </ModalTrigger>
      <ModalOverlay />
      <ModalContent w={['100%', 600]} column gapY8 px10--i pb20--i>
        {/* <ModalCloseButton /> */}

        <Box column bgNeutralsBackground rounded-12 gap3>
          <Box toCenterY toBetween gap3>
            <Box toCenterY gap3>
              <Avatar size="lg">
                {/* <AvatarFallback>{nickname}</AvatarFallback> */}
              </Avatar>
              <Box textBase fontSemibold leadingNormal>
                {/* {nickname} */}
              </Box>
            </Box>
            <Button
              isSquare
              variant="ghost"
              colorScheme="gray600"
              onClick={() => {}}
            >
              <IconDisconnect />
            </Button>
          </Box>
        </Box>
        <QrCode />
      </ModalContent>
    </Modal>
  )
}
