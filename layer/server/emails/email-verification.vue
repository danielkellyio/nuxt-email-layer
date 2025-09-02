<script setup lang="ts">
import {
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@vue-email/components";

defineProps({
  userName: {
    type: String,
    default: "User",
  },
  verificationUrl: {
    type: String,
    default: "https://app.example.com/verify",
  },
  expiresIn: {
    type: String,
    default: "24 hours",
  },
  supportUrl: {
    type: String,
    default: "https://help.example.com",
  },
});
</script>

<template>
  <Html lang="en">
    <Head />
    <Preview
      >Please verify your email address to complete your account setup.</Preview
    >

    <Container
      style="
        margin: 0 auto;
        padding: 20px 0;
        max-width: 600px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
      "
    >
      <!-- Header -->
      <Section
        style="
          background-color: #ffffff;
          padding: 40px 32px 20px 32px;
          border-radius: 8px 8px 0 0;
          border: 1px solid #e6e6e6;
          border-bottom: none;
        "
      >
        <Section style="text-align: center; margin-bottom: 24px">
          <div
            style="
              width: 64px;
              height: 64px;
              background-color: #2563eb;
              border-radius: 50%;
              margin: 0 auto 16px auto;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span style="color: #ffffff; font-size: 24px; font-weight: 600"
              >✓</span
            >
          </div>
        </Section>

        <Heading
          style="
            color: #1a1a1a;
            font-size: 28px;
            font-weight: 600;
            line-height: 36px;
            margin: 0 0 16px 0;
            text-align: center;
          "
        >
          Verify Your Email Address
        </Heading>
        <Text
          style="
            color: #666666;
            font-size: 16px;
            line-height: 24px;
            margin: 0;
            text-align: center;
          "
        >
          Hi {{ userName }}, please click the button below to verify your email
          address and activate your account.
        </Text>
      </Section>

      <!-- Main Content -->
      <Section
        style="
          background-color: #ffffff;
          padding: 32px;
          border: 1px solid #e6e6e6;
          border-top: none;
          border-bottom: none;
        "
      >
        <!-- Security Notice -->
        <Section
          style="
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 32px;
          "
        >
          <Text
            style="
              color: #1e40af;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
              font-weight: 600;
            "
          >
            🔒 Security Notice
          </Text>
          <Text
            style="
              color: #1e40af;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            This verification link will expire in {{ expiresIn }}. If you didn't
            create this account, you can safely ignore this email.
          </Text>
        </Section>

        <!-- CTA Button -->
        <Section style="text-align: center; margin-bottom: 32px">
          <Button
            :href="verificationUrl"
            style="
              background-color: #16a34a;
              border-radius: 6px;
              color: #ffffff;
              font-size: 16px;
              font-weight: 600;
              text-decoration: none;
              text-align: center;
              display: inline-block;
              padding: 16px 32px;
              line-height: 20px;
              border: none;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            "
          >
            Verify Email Address
          </Button>
        </Section>

        <!-- Alternative Link -->
        <Section
          style="
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 32px;
          "
        >
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 12px 0;
              font-weight: 600;
            "
          >
            Button not working?
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
            "
          >
            Copy and paste this link into your browser:
          </Text>
          <Text
            style="
              color: #2563eb;
              font-size: 12px;
              line-height: 18px;
              margin: 0;
              word-break: break-all;
              font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                monospace;
            "
          >
            {{ verificationUrl }}
          </Text>
        </Section>

        <Hr
          style="border: none; border-top: 1px solid #e6e6e6; margin: 32px 0"
        />

        <!-- Help Section -->
        <Text
          style="
            color: #666666;
            font-size: 14px;
            line-height: 20px;
            margin: 0 0 8px 0;
            text-align: center;
          "
        >
          Having trouble? We're here to help.
        </Text>
        <Text
          style="
            color: #666666;
            font-size: 14px;
            line-height: 20px;
            margin: 0;
            text-align: center;
          "
        >
          Visit our
          <Link :href="supportUrl" style="color: #2563eb; text-decoration: none"
            >Help Center</Link
          >
          or reply to this email.
        </Text>
      </Section>

      <!-- Footer -->
      <Section
        style="
          background-color: #f8f9fa;
          padding: 32px;
          border: 1px solid #e6e6e6;
          border-radius: 0 0 8px 8px;
          text-align: center;
        "
      >
        <Text
          style="
            color: #999999;
            font-size: 12px;
            line-height: 16px;
            margin: 0 0 8px 0;
          "
        >
          This verification email was requested for your account.
        </Text>
        <Text
          style="color: #999999; font-size: 12px; line-height: 16px; margin: 0"
        >
          If you didn't request this, please ignore this email or contact
          support.
        </Text>
      </Section>
    </Container>
  </Html>
</template>
