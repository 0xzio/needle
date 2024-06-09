import { Box } from '@fower/react'
import { useAccount } from 'wagmi'
import { BelieverNFTNav } from './BelieverNFTNav'
import { GenerateReferralCodeModalModal } from './GenerateReferralCodeModal/GenerateReferralCodeModalModal'
import { InviteInfo } from './InviteInfo'
import { MintButton } from './MintButton'
import { MyReferralsModal } from './MyReferralsModal/MyReferralsModal'
import { NFTBasicInfo } from './NFTBasicInfo'
import { PriceChart } from './PriceChart'

const urls = [
  '/images/nft/penx-believer-nft-1.png',
  '/images/nft/penx-believer-nft-2.png',
  '/images/nft/penx-believer-nft-3.png',
  '/images/nft/penx-believer-nft-4.png',
  '/images/nft/penx-believer-nft-5.png',
  '/images/nft/penx-believer-nft-6.png',
  '/images/nft/penx-believer-nft-7.png',
  '/images/nft/penx-believer-nft-8.png',
  '/images/nft/penx-believer-nft-9.png',
  '/images/nft/penx-believer-nft-10.png',
  '/images/nft/penx-believer-nft-11.png',
  '/images/nft/penx-believer-nft-12.png',
  '/images/nft/penx-believer-nft-13.png',
  '/images/nft/penx-believer-nft-14.png',
  '/images/nft/penx-believer-nft-15.png',
  '/images/nft/penx-believer-nft-16.png',
  '/images/nft/penx-believer-nft-17.png',
  '/images/nft/penx-believer-nft-18.png',
  '/images/nft/penx-believer-nft-19.png',
  '/images/nft/penx-believer-nft-20.png',
  '/images/nft/penx-believer-nft-21.png',
]

export function BelieverNFT() {
  const { isConnected } = useAccount()

  const list = Array(1024)
    .fill('')
    .map((_, i) => i)

  return (
    <Box maxW-1200 m-auto pt4 relative>
      <GenerateReferralCodeModalModal />
      <MyReferralsModal />
      <BelieverNFTNav />

      <Box toBetween toCenterY mt20>
        <Box>
          <Box text2XL fontBold gray500 mb4>
            What Believer NFT can do?
          </Box>
          <Box column gap2 gray400>
            <Box>Everything in Pro Plan plus forever </Box>
            <Box>First Access to New Features</Box>
            <Box>Calls with the Team Priority Support</Box>
          </Box>
        </Box>
        <Box mb10 toCenter column gap4>
          <Box text5XL fontBold>
            PenX Believer NFT
          </Box>
          <NFTBasicInfo />

          <InviteInfo />

          {isConnected && <MintButton />}
        </Box>
        <PriceChart />
      </Box>

      <Box grid gridTemplateColumns-4 gap4 mt10>
        {list.map((item) => (
          <Box key={item} column gap2>
            <Box shadowPopover rounded2XL toCenter h-250 w-250 overflowHidden>
              <Box
                w-100p
                h-100p
                as="img"
                src={urls[Math.floor(Math.random() * urls.length)]}
              />
            </Box>
            <Box textLG gray400>
              #{item}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
