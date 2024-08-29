import {
  Box,
  Container,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react"

const PrivacyPolicy = () => {
  return (
    <Container maxW="container.xl">
      <Box
        color="#fff"
        bgColor={"brand.primary"}
        display="flex"
        justifyContent="center"
        p="50px"
        mb="50px"
      >
        <Text
          fontSize={{ base: "20px", md: "36px" }}
          fontWeight="700"
          textAlign="center"
        >
          Privacy Policy
        </Text>
      </Box>
      <Box>
        <Text fontWeight="bold">
          Consent to installation of the Application
        </Text>
        <Text mt="1">
          Under all relevant data protection laws, we are required to provide
          you with certain information about who we are, how we process your
          personal data and for what purposes, and your rights in relation to
          your personal data. This information is provided in the succeeding
          paragraph of this publication, and it is important that you read same.
          <br />
          <br />
          Upon the installation of this Application (“App”), you automatically
          consent to our processing of your personal data (including your name,
          contact details, financial and device information).
          <br />
          <br />
          <Text as="span" fontWeight="bold">
            YES
          </Text>{" "}
          I consent to the installation of the App for the purposes of election
          operations, management and monitoring.
        </Text>
        <br />
        <Text fontWeight="bold">How you can withdraw consent</Text>
        <Text my="1">
          You can however, withdraw your consent at any time by contacting us
          support@Polleasy.com but that will not affect the lawfulness of any
          processing carried out before you withdraw your consent.
        </Text>
        <br />
        <Text fontWeight="bold">Consent to processing Location Data</Text>
        <Text my="1">
          <Text as="span" fontWeight="bold">
            YES
          </Text>{" "}
          I consent to processing of my Location Data including details of my
          current location disclosed by GPS technology so that location-enabled
          Services are activated for election monitoring, management and
          reporting.
        </Text>
        <br />
        <Text>
          <Text as="span" fontWeight="bold">
            NO
          </Text>{" "}
          I do not consent to processing of my Location Data and
          location-enabled Services are disabled in my settings.
        </Text>
        <br />
        <Text fontWeight="bold">Location Data:</Text>
        <Text>
          Ground Rent Digital Limited or any of its subsidiaries/affiliates{" "}
          <Text as="span" fontWeight="bold">
            (we)
          </Text>{" "}
          are committed to protecting your personal data and respecting your
          privacy.
        </Text>
        <br />
        <Text fontWeight="bold">Introduction :</Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList spacing={5}>
            <ListItem>
              Ground Rent mobile application software{" "}
              <Text as="span" fontWeight="bold">
                (App)
              </Text>{" "}
              [available on our site] OR hosted on the application store{" "}
              <Text as="span" fontWeight="bold">
                (App Site),
              </Text>
              once you have downloaded or streamed a copy of the App onto your
              mobile telephone or handheld device{" "}
              <Text as="span" fontWeight="bold">
                (Device)
              </Text>
            </ListItem>
            <ListItem>
              Any of the services accessible through the App{" "}
              <Text as="span" fontWeight="bold">
                (Services)
              </Text>{" "}
              that are available on the App Site or other sites of ours{" "}
              <Text fontWeight="bold" as="span">
                (Services sites)
              </Text>{" "}
              This policy sets out the basis on which any personal data we
              collect from you, or that you provide to us, will be processed by
              us.
            </ListItem>
            <ListItem>
              This App is not intended for children and we do not knowingly
              collect data relating to children. Please read the following
              carefully to understand our practices regarding your personal data
              and how we will treat it.
            </ListItem>
          </UnorderedList>
        </Box>
        <Text mb="10px">
          {`Ground Rent Digital Limited (“GIS-GRP”) is the controller and is
            responsible for your personal data (collectively referred to as
            ["Company"], "we", "us" or "our" in this policy).`}
        </Text>
        <Text>
          We have appointed a [ data privacy manager]. If you have any questions
          about this privacy policy, please contact them using the application
        </Text>
        <br />
        <Text fontWeight="bold" mb="1">
          Changes to the privacy policy and your duty to inform us of changes
        </Text>
        <Text>
          We keep our privacy policy under regular review.
          <Text my="1">
            This version was last updated on 12th March 2023. It may change and
            if it does, these changes will be posted on this page and, where
            appropriate, notified to you when you next start the App or log onto
            one of the Services Sites]. The new policy may be displayed
            on-screen and you may be required to read and accept the changes to
            continue your use of the App or the Services.
          </Text>
          It is important that the personal data we hold about you is accurate
          and current. Please keep us informed if your personal data changes
          during our relationship with you.
        </Text>
        <Text fontWeight="bold" mt="5" mb="1">
          Third Party links
        </Text>
        <Text>
          Our Sites may, from time to time, contain links to and from the
          websites of our partner networks, advertisers and affiliates. Please
          note that these websites and any services that may be accessible
          through them have their own privacy policies and that we do not accept
          any responsibility or liability for these policies or for any personal
          data that may be collected through these websites or services, such as
          Contact and Location Data. Please check these policies before you
          submit any personal data to these websites or use these services.
        </Text>
        <Text fontWeight="bold" mt="5" mb="1">
          Data we collect about you
        </Text>
        <Text>
          We may collect, use, store and transfer different kinds of personal
          data about you as follows:
        </Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList>
            {[
              "Identity Data",
              "Contact Data",
              "Election Data",
              "Device Data",
              "Content Data",
              "Profile Data",
              "Usage Data",
              "Marketing and Communications Data",
              "Location Data",
            ].map((item, index) => (
              <ListItem key={index}> {item}</ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Text mb="10px">
          We also collect, use and share Aggregated Data such as statistical or
          demographic data for any purpose. Aggregated Data could be derived
          from your personal data but is not considered personal data in law as
          this data will not directly or indirectly reveal your identity. For
          example, we may aggregate your Usage Data to calculate the percentage
          of users accessing a specific App feature. However, if we combine or
          connect Aggregated Data with your personal data so that it can
          directly or indirectly identify you, we treat the combined data as
          personal data which will be used in accordance with this privacy
          policy.
        </Text>
        <Text>
          We do not collect any Special Categories of Personal Data about you
          (this includes details about your race or ethnicity, religious or
          philosophical beliefs, sex life, sexual orientation, political
          opinions, trade union membership, information about your health, and
          genetic and biometric data). Nor do we collect any information about
          criminal convictions and offences.
        </Text>
        <Text my="10px" fontWeight="bold">
          How is your personal data collected?
        </Text>
        <Text>We will collect and process the following data about you:</Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList spacing={3}>
            <ListItem>
              <Text fontWeight="bold">Information you give us.</Text> This is
              information (including Identity, Contact, Financial, and Marketing
              and Communications Data) you consent to giving us about you by
              filling in forms on the App Site and the Services Sites (together
              Our Sites), or by corresponding with us (for example, by email or
              chat). It includes information you provide when you register to
              use the App Site, download or register an App, subscribe to any of
              our Services, search for an App or Service, make an in-App
              purchase, share data via an {`App's`} social media functions,enter
              a competition, promotion or survey, and when you report a problem
              with an App, our Services, or any of Our Sites. If you contact us,
              we will keep a record of that correspondence.
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Information we collect about you and your device
              </Text>{" "}
              Information we collect about you and your device. Each time you
              visit one of Our Sites or use one of our Apps we will
              automatically collect personal data including Device, Content and
              Usage Data. We collect this data using cookies and other similar
              technologies.
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">Location Data.</Text> We also use GPS
              technology to determine your current location. Some of our
              location-enabled Services require your personal data for the
              feature to work. If you wish to use the particular feature, you
              will be asked to consent to your data being used for this purpose.
              You can withdraw your consent at any time by [disabling Location
              Data in your settings.
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Information we receive from other sources including third
                parties and publicly available sources.{" "}
              </Text>{" "}
              We will receive personal data about you from various third parties
              and public sources]as set out below:
              <Box pl="20px" pt="20px" mb="20px">
                <UnorderedList spacing={3}>
                  <ListItem>
                    Device Data from the following parties: <br />
                    analytics providers; <br />
                    advertising networks inside{" "}
                    <Text fontWeight="bold" as="span">
                      OR
                    </Text>{" "}
                    outside Nigeria] and <br /> search information providers.
                  </ListItem>
                  <ListItem>
                    Identity and Contact Data from data brokers or aggregators;
                  </ListItem>
                </UnorderedList>
              </Box>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">Unique application numbers.</Text> When
              you want to install or uninstall a Service containing a unique
              application number or when such a Service searches for automatic
              updates, that number and information about your installation, for
              example, the type of operating system, may be sent to us.
            </ListItem>
          </UnorderedList>
        </Box>
        <Text fontWeight="bold" mb="10px">
          Cookies
        </Text>
        <Text>
          We use cookies and other tracking technologies to distinguish you from
          other users of the App, App Site, the distribution platform (Appstore)
          or Services Sites and to remember your preferences. This helps us to
          provide you with a good experience when you use the App or browse any
          of Our Sites and also allows us to improve the App and Our Sites. For
          detailed information on the cookies we use, the purposes for which we
          use them and how you can exercise your choices regarding our use of
          your cookies.
        </Text>
        <Text fontWeight="bold" my="10px">
          How we use your personal data
        </Text>
        <Text>
          We will only use your personal data when the law allows us to do so.
          Most commonly we will use your personal data in the following
          circumstances:
        </Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList spacing={3}>
            <ListItem>Where you have consented before the processing.</ListItem>
            <ListItem>
              Where we need to perform a contract we are about to enter or have
              entered with you.
            </ListItem>
            <ListItem>
              Where it is necessary for our legitimate interests (or those of a
              third party) and your interests and fundamental rights do not
              override those interests.
            </ListItem>
            <ListItem>
              Where we need to comply with a legal or regulatory obligation.
            </ListItem>
          </UnorderedList>
        </Box>
        <Text>
          We will only send you direct marketing communications by email or text
          if we have your consent. You have the right to withdraw that consent
          at any time by contacting us. <br />
          We will get your express opt-in consent before we share your personal
          data with any third party for marketing purposes
        </Text>
        <Text fontWeight="bold" my="20px">
          Purposes for which we will use your personal data
        </Text>
        <Box my="20px" overflowX={{ base: "scroll", md: "hidden" }}>
          <Table>
            <Thead>
              <Tr border="1px solid black">
                {[
                  "Purpose/activity",
                  "Type of data",
                  "Lawful basis for processing",
                ].map((item, index) => (
                  <Th
                    key={index}
                    border="1px solid black"
                    color="#000"
                    fontWeight="bold"
                    fontSize="16px"
                  >
                    {item}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody border="1px solid black">
              <Tr border="1px solid black">
                {[
                  "To install the App and register you as a new App User",
                  "Identity Contact Financial Device",
                  "Your consent",
                ].map((item, index) => (
                  <Td key={index} border="1px solid black">
                    {item}
                  </Td>
                ))}
              </Tr>
              <Tr border="1px solid black">
                {[
                  "To process data and information for the service ",
                  `Identity
                    Contact 
                    Device
                    Marketing and Communications 
                    Location
                    Your consent`,
                  `
                    Your consent
  To provide service 
  Performance of a contract to which you are a party
  Necessary for our legitimate interests `,
                ].map((item, index) => (
                  <Td key={index} border="1px solid black">
                    {item}
                  </Td>
                ))}
              </Tr>
              <Tr border="1px solid black">
                {[
                  "To manage our relationship with you including notifying you of changes to the App or any Services ",
                  `Identity 
                    Contact 
                    Profile 
                    Marketing and Communications 
                    `,
                  `
                    Your consent
                    Performance of a contract with you 
                    Necessary for our legitimate interests (to keep records updated and to analyse how customers use our products/ Services)
                    Necessary to comply with legal obligations (to inform you of any changes to our terms and conditions) `,
                ].map((item, index) => (
                  <Td key={index} border="1px solid black">
                    {item}
                  </Td>
                ))}
              </Tr>
              <Tr border="1px solid black">
                {[
                  "To administer and protect our business and this App including troubleshooting, data analysis and system testing",
                  `Identity 
                    Contact
                    Device 
                    `,
                  `
                    Necessary for our legitimate interests (for running our business, provision of administration and IT services, network security)  `,
                ].map((item, index) => (
                  <Td key={index} border="1px solid black">
                    {item}
                  </Td>
                ))}
              </Tr>
              <Tr border="1px solid black">
                {[
                  "To monitor trends so we can improve the App",
                  `Identity 
                    Contact 
                    Device 
                    Content 
                    Profile 
                    Usage 
                    Marketing and Communications 
                    Location 
                    
                    `,
                  `
                    Consent 
                    Necessary for our legitimate interests (to develop our products/Services and grow our business) `,
                ].map((item, index) => (
                  <Td key={index} border="1px solid black">
                    {item}
                  </Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Text fontWeight="bold" my="20px">
          Disclosures of your personal data
        </Text>
        <Text>
          When you consent to providing us with your personal data, we will also
          ask you for your consent to share your personal data with the third
          parties set out below for the purposes set out in the table:
        </Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList spacing={3}>
            <ListItem>Internal Third Parties</ListItem>
            <ListItem>External Third Parties</ListItem>
            <ListItem>
              Third parties to whom we may choose to sell, transfer or merge
              parts of our business or our assets. Alternatively, we may seek to
              acquire other businesses or merge with them. If a change happens
              to our business, then the new owners may use your personal data in
              the same way as set out in this privacy policy.
            </ListItem>
          </UnorderedList>
        </Box>
        <Text fontWeight="bold" my="20px">
          International transfers
        </Text>
        <Text>
          Whenever we transfer your personal data out of Nigeria, we ensure a
          similar degree of protection is afforded to it by ensuring at least
          one of the following safeguards is implemented:
        </Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList spacing={3}>
            <ListItem>
              We will only transfer your personal data to countries that have
              been deemed to provide an adequate level of protection for
              personal data.
            </ListItem>
            <ListItem>
              Where we use certain service providers, we may use specific
              contracts approved by the UK or EU which give personal data the
              same protection it has in Nigeria.
            </ListItem>
          </UnorderedList>
        </Box>
        <Text>
          Please contact us if you want further information on the specific
          mechanism used by us when transferring your personal data out of
          Nigeria.
        </Text>
        <Text fontWeight="bold" my="20px">
          Data security
        </Text>
        <Text>
          All information you provide to us is stored on our secure servers. Any
          payment transactions carried out by us or our chosen third-party
          provider of payment processing services will be encrypted using
          Secured Sockets Layer technology. Where we have given you (or where
          you have chosen) a password that enables you to access certain parts
          of Our Sites, you are responsible for keeping this password
          confidential. We ask you not to share a password with anyone. <br />
          <br /> Once we have received your information, we will use strict
          procedures and security features to try to prevent your personal data
          from being accidentally lost, used or accessed in an unauthorised way.{" "}
          <br /> <br /> We will collect and store personal data on your Device
          using [pplication data caches and browser web storage (including
          HTML5). <br /> <br />
          Certain Services include social networking, chat room or forum
          features. Ensure when using these features that you do not submit any
          personal data that you do not want to be seen, collected or used by
          other users. <br /> <br /> We have put in place procedures to deal
          with any suspected personal data breach and will notify you and any
          applicable regulator when we are legally required to do so.
        </Text>
        <Text fontWeight="bold" my="20px">
          Data retention
        </Text>
        <Text>
          Details of retention periods for different aspects of your personal
          data are available in our retention policy which you can request by
          contacting us. In some circumstances you can ask us to delete your
          data. <br /> <br /> In some circumstances we will anonymise your
          personal data (so that it can no longer be associated with you) for
          research or statistical purposes, in which case we may use this
          information indefinitely without further notice to you.
          <br /> <br /> In the event that you do not use the App for a period of
          six (6) months then we will treat the account as expired and your
          personal data may be deleted.
        </Text>
        <Text fontWeight="bold" my="20px">
          Your legal rights
        </Text>
        <Text>
          Under certain circumstances you have the following rights under data
          protection laws in relation to your personal data. You also have the
          right to ask us not to continue to process your personal data for
          marketing purposes. <br /> <br /> You can exercise any of these rights
          at any time by contacting us at{" "}
          <Text fontStyle="italic">support@polleasy.com</Text>
        </Text>
        <Text fontWeight="bold" my="20px">
          Glossary
        </Text>
        <Text fontWeight="bold" my="20px">
          Lawful Basis
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Consent
          </Text>{" "}
          means processing your personal data where you have signified your
          agreement by a statement or clear opt-in to processing for a specific
          purpose. Consent will only be valid if it is a freely given, specific,
          informed and unambiguous indication of what you want. You can withdraw
          your consent at any time by contacting us.
        </Text>
        <Text my="20px">
          <Text as="span" fontWeight="bold">
            Legitimate Interest
          </Text>{" "}
          means the interest of our business in conducting and managing our
          business to enable us to give you the best service/product and the
          best and most secure experience. We make sure we consider and balance
          any potential impact on you (both positive and negative) and your
          rights before we process your personal data for our legitimate
          interests. We do not use your personal data for activities where our
          interests are overridden by the impact on you (unless we have your
          consent or are otherwise required or permitted to by law). You can
          obtain further information about how we assess our legitimate
          interests against any potential impact on you in respect of specific
          activities by contacting us.
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Performance of Contract
          </Text>{" "}
          means processing your data where it is necessary for the performance
          of a contract to which you are a party or to take steps at your
          request before entering into such a contract.
        </Text>
        <Text my="20px">
          <Text as="span" fontWeight="bold">
            Comply with a legal obligation
          </Text>{" "}
          means processing your personal data where it is necessary for
          compliance with a legal obligation that we are subject to.
        </Text>
        <Text>you have the right to:</Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList spacing={3}>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Request access
                </Text>{" "}
                {`to your personal data (commonly known as a "data subject access
                  request"). This enables you to receive a copy of the personal
                  data we hold about you and to check that we are lawfully
                  processing it.`}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Request erasure
                </Text>{" "}
                of your personal data. This enables you to ask us to delete or
                remove personal data where there is no good reason for us
                continuing to process it. You also have the right to ask us to
                delete or remove your personal data where you have successfully
                exercised your right to object to processing (see below), where
                we may have processed your information unlawfully or where we
                are required to erase your personal data to comply with local
                law. Note, however, that we may not always be able to comply
                with your request of erasure for specific legal reasons which
                will be notified to you, if applicable, at the time of your
                request.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Object to processing
                </Text>{" "}
                of your personal data where we are relying on a legitimate
                interest (or those of a third party) and there is something
                about your particular situation which makes you want to object
                to processing on this ground as you feel it impacts on your
                fundamental rights and freedoms. You also have the right to
                object where we are processing your personal data for direct
                marketing purposes. In some cases, we may demonstrate that we
                have compelling legitimate grounds to process your information
                which override your rights and freedoms.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Request restriction
                </Text>{" "}
                of processing of your personal data. This enables you to ask us
                to suspend the processing of your personal data in the following
                scenarios:
              </Text>
              <OrderedList listStyleType="lower-alpha">
                <ListItem>
                  {`if you want us to establish the data's accuracy;`}
                </ListItem>
                <ListItem>
                  where our use of the data is unlawful but you do not want us
                  to erase it;
                </ListItem>
                <ListItem>
                  where you need us to hold the data even if we no longer
                  require it as you need it to establish, exercise or defend
                  legal claims; or
                </ListItem>
                <ListItem>
                  you have objected to our use of your data but we need to
                  verify whether we have overriding legitimate grounds to use
                  it.
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Withdraw consent at any time
                </Text>{" "}
                where we are relying on consent to process your personal data.
                However, this will not affect the lawfulness of any processing
                carried out before you withdraw your consent. If you withdraw
                your consent, we may not be able to provide certain products or
                services to you. We will advise you if this is the case at the
                time you withdraw your consent.
              </Text>
            </ListItem>
          </UnorderedList>
        </Box>
        <Text fontWeight="bold" my="10px">
          Description of categories of personal data
        </Text>
        <Box pl="20px" pt="20px" mb="20px">
          <UnorderedList spacing={3}>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Identity Data:
                </Text>{" "}
                [first name, last name, maiden name, username or similar
                identifier, title, date of birth, gender].
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Contact Data:
                </Text>{" "}
                address, email address and telephone numbers].
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Device Data:
                </Text>{" "}
                {`
                      
                      includes [the type of mobile device you use,] [a unique device
                      identifier [(for example, your Device's IMEI number, the MAC
                      address of the Device's wireless network interface, or the
                      mobile phone number used by the Device)],] [mobile network
                      information,] [your mobile operating system,] [the type of
                      mobile browser you use,] [time zone setting,].
                      `}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Content Data:
                </Text>{" "}
                includes information stored on your Device, including [login
                information,] [photos, videos or other digital content,]
                [check-ins,].
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Profile Data:
                </Text>{" "}
                includes [your username and password, in-App purchase history,
                your interests, preferences, feedback, responses].
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Usage Data:
                </Text>{" "}
                includes details of your use of any of our Apps or your visits
                to any of Our Sites including, but not limited to, [traffic data
                [and other communication data],] whether this is required for
                our own billing purposes or otherwise [and the resources that
                you access].
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Text as="span" fontWeight="bold">
                  Location Data:
                </Text>{" "}
                includes [your current location disclosed by GPS technology or
                other technology.
              </Text>
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </Container>
  )
}

export default PrivacyPolicy
