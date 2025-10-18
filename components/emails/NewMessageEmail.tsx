import { NewMessage } from "@/utils/types";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type NewMessageEmailProps = {
  newMessage: NewMessage;
};

export const NewMessageEmail = ({ newMessage }: NewMessageEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New Message!</Preview>
      <Container style={container}>
        <Img
          src={`https://thesoulcialwell.org/assets/origins.svg`}
          width={180}
          height={180}
          alt='The Soulcial Well logo'
        />
        <Heading style={heading}>Hey Team! You Have A New Message!</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <b>Name:</b> {newMessage.name}
          </Text>
          <Text style={paragraph}>
            <b>Email:</b> {newMessage.email}
          </Text>
          <Text style={paragraph}>
            <b>Service:</b> {newMessage.service}
          </Text>
          <Text style={paragraph}>
            <b>Message:</b> {newMessage.message}
          </Text>
          <Text style={paragraph}>
            <b>Referral:</b> {newMessage.referral}
          </Text>
        </Section>

        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

NewMessageEmail.PreviewProps = {
  newMessage: {
    name: "Elliot Hannah",
    email: "echannah631@gmail.com",
    service: "Test Service",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate at impedit voluptas omnis ab magnam fuga earum laboriosam. Esse assumenda hic odio qui magni culpa corporis cumque numquam asperiores vitae.",
  },
} as NewMessageEmailProps;

export default NewMessageEmail;

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

const hr = {
  borderColor: "#dcd41f",
  marginTop: "48px",
};
