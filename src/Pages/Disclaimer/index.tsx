import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Stack, VStack, Flex, Text, Button } from '@chakra-ui/react'

import Title from './Title'

const Disclaimer: FunctionComponent = (props) => {
  return (
    <VStack
      mt={'15px'}
      px={{ sm: '10px', md: '20px', lg: '110px' }}
      w={'100%'}
      spacing={'53px'}
    >
      <Title />
      <Flex
        mt={'46px'}
        rounded={'25px'}
        background={'#212121'}
        w='100%'
        align='center'
        px={{ sm: '10px', md: '20px', lg: '50px' }}
        py={{ sm: '10px', md: '20px', lg: '60px' }}
      >
        <Text
          fontSize='11px'
          fontWeight={'800'}
        >
          Before interacting with Near Treasury (including participating in the
          Community Farming and Savings Protocols or otherwise using the Near
          Treasury Smart Contract System), please carefully read these disclaimers
          and all applicable terms and conditions. Use of the Technology is solely at
          your own risk.
          For informational purposes only; no warranties. The Repository is intended
          solely to present information about specific technologies. Statements in
          the Repository do not constitute advice, representation, warranty,
          certification, guarantee, or promise with respect to these technologies,
          their use, or any other subject matter covered by the Repository, nor do
          they constitute an offer or agreement to make available, maintain, or
          update these technologies, to sell or purchase assets, or to effect any
          transaction. You should not make any financial or other decisions based
          on the information in the Repository.<br/><br/>

          The Repository and the matters described in the Repository have not
          been reviewed, approved, endorsed or registered by any regulatory
          agency or other governmental entity, and the authors of the
          Repository are not licensed by any regulatory agency or other
          governmental entity to provide legal, financial, accounting,
          investment or other advice or services.
          The Near Treasury Protocol places security above all else. All members of
          the Near Treasury community who have worked on the Protocol have gone
          to great lengths to ensure its security and stability.
          The DeFi community believes that the real test of a smart contract
          platform’s security is its size, visibility, and time. Please evaluate the
          following security tests and make your own decisions about security and
          adequacy.<br/><br/>

          <Text fontSize='13px'>Disclosure:</Text>
          All bug reports should be sent to @neartreasurysupport in either written
          or video form. The notification must include clear and concise procedures
          to recover the reported vulnerability. Near Treasury will respond as quickly
          as possible to acknowledge the report.<br/><br/>

          <Text fontSize='13px'>Near Treasury Bug Program:</Text>
          We appreciate the contribution of hackers who act in good faith to help us
          maintain the highest standard of security for the Near ecosystem.
          Although the Near Treasury protocol has been peer-reviewed and formally
          verified, it is based on novel technology that may have unknown
          vulnerabilities.
          As you can see on the roadmap, we have spent weeks penetrating our
          protocol, testing and fixing every conceivable gap.
          Near Treasury invites the public to evaluate our contracts and security and
          responsibly report any issues. This program recognizes the importance of
          working with the community of independent security researchers, sets
          forth our understanding of good faith in identifying and reporting
          vulnerabilities, and outlines what you should expect in return.<br/><br/>

          <Text fontSize='13px'>Risks:</Text>
          Near Treasury is currently in the early stages of development and involves
          a variety of unpredictable risks. You acknowledge and agree that there are
          numerous risks associated with purchasing NT Tokens (to be announced),
          owning NT Tokens, and using NT Tokens to participate in Near Treasury.
          Inadequate Disclosure of Information: As of the date of this document,
          Near Treasury is still being finalized and its design concepts, consensus
          mechanisms, algorithms, codes, and other technical details and
          parameters are subject to constant and frequent updates and changes.
          Although this document contains the most current information on Near
          Treasury, it is not absolutely complete and may be adjusted and updated
          by the Near Treasury team from time to time. The Near Treasury—Team is
          neither able nor obligated to keep NT Token holders up to date on every
          detail (including development progress and expected milestones) related
          to the Near Treasury development project, so insufficient disclosure of
          information is inevitable and appropriate.<br/><br/>

          <Text fontSize='13px'>Uncertain regulations and enforcement actions:</Text>
          The regulatory status of Near Treasury, NT tokens, and distributed ledger
          technology is unclear or unresolved in many jurisdictions. Regulation of
          digital assets has become a regulatory priority in all major countries
          around the world. It is impossible to predict how, when, or if regulators will
          apply existing regulations or adopt new regulations related to this
          technology and its applications, including NT Tokens and/or Near
          Treasury. Regulatory actions could adversely affect NT Tokens and/or
          Near Treasury in a number of ways. The Company, the Distributor (or their
          respective affiliates) may cease doing business in a jurisdiction if
          regulatory action or changes in law or regulation make it illegal to operate
          in that jurisdiction or it is not commercially desirable to obtain the
          necessary regulatory approval(s) to operate in that jurisdiction.<br/><br/>

          <Text fontSize='13px'>Failure of Development:</Text>
          There is a risk that Near Treasury development will not be conducted or
          implemented as planned for a variety of reasons, including, but not limited
          to, the event of a decline in the price of a digital asset, virtual currency, or
          NT Token, unforeseen technical difficulties, and a lack of development
          funding for activities.<br/><br/>

          <Text fontSize='13px'>Security Vulnerabilities:</Text>
          Hackers or other malicious groups or organizations may attempt to disrupt
          NT-Token and/or Near Treasury in a variety of ways, including, but not
          limited to, malware attacks, denial of service attacks, consensus-based
          attacks, Sybil attacks, smurfing and spoofing. In addition, there is a risk
          that a third party or a member of the Company, the Distributor or their
          respective affiliates may intentionally or unintentionally introduce
          vulnerabilities into the core infrastructure of NT Tokens and/or Near
          Treasury, which could negatively impact NT Tokens and/or Near Treasury.
          In addition, the future of cryptography and security innovations is highly
          unpredictable, and advances in cryptography or technological advances
          (including, but not limited to, the development of quantum computers)
          could pose unknown risks to NT token and/or Near Treasury by rendering
          the cryptographic consensus mechanism underlying the blockchain
          protocol ineffective.<br/><br/>

          <Text fontSize='13px'>Other Risks:</Text>
          In addition, the potential risks briefly mentioned above are not exhaustive,
          and there are other risks (as further discussed in the Terms and
          Conditions) associated with your participation in Near Treasury and the
          acquisition, ownership and use of NT Tokens, including risks that the
          Company or the Distributor cannot anticipate. Such risks may also
          materialize in the form of unforeseen variations or combinations of the
          foregoing risks. You should conduct comprehensive due diligence on the
          Company, the Distributor, their respective affiliates and the Near Treasury
          team and understand the overall framework, mission and vision of Near
          Treasury before participating in the same and/or acquiring NT Tokens.
        </Text>
      </Flex>

    </VStack>
  );
}
export default Disclaimer;

