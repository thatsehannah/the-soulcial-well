import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ConfirmationEmailProps = {
  name: string;
};

export const ConfirmationEmail = ({ name }: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        Thank you for contacting us and sharing interest in The Soulcial Well.
      </Preview>
      <Container style={container}>
        <Img
          src={`https://thesoulcialwell.org/assets/origins.svg`}
          width={180}
          height={180}
          alt='The Soulcial Well logo'
        />
        <Heading style={heading}>Hey There, {name} 😊!</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            Thank you for contacting us and sharing your interest in The
            Soulcial Well. We&apos;ve received your message and are excited to
            learn more about how we can support you. <br /> <br /> At The
            Soulcial Well, we believe that self care is about connection, shared
            experiences, and creating spaces where you feel truly seen and
            heard. Your inquiry is the first step toward something meaningful,
            and we&apos;ll be in touch soon with more details. In the meantime,
            feel free to explore more of our endeavors at{" "}
            <Link
              style={link}
              href='https://thesoulcialwell.org'
            >
              thesoulcialwell.org
            </Link>
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- The Soulcial Well
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

ConfirmationEmail.PreviewProps = {
  name: "Elliot",
} as ConfirmationEmailProps;

export default ConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#79472c",
};

const hr = {
  borderColor: "#dcd41f",
  marginTop: "48px",
};
