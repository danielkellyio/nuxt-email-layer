<script setup lang="ts">
import {
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
  verificationCode: {
    type: String,
    default: "123456",
  },
  expiresIn: {
    type: String,
    default: "10 minutes",
  },
  ipAddress: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
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
      >Your verification code: {{ verificationCode }} - expires in
      {{ expiresIn }}</Preview
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
              background-color: #7c3aed;
              border-radius: 50%;
              margin: 0 auto 16px auto;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span style="color: #ffffff; font-size: 24px; font-weight: 600"
              >🛡️</span
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
          Your Verification Code
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
          Hi {{ userName }}, here's your two-factor authentication code to
          complete your sign-in.
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
        <!-- Verification Code -->
        <Section style="text-align: center; margin-bottom: 32px">
          <Section
            style="
              background-color: #f8f9fa;
              border: 2px solid #e6e6e6;
              padding: 24px;
              border-radius: 8px;
              display: inline-block;
            "
          >
            <Text
              style="
                color: #999999;
                font-size: 12px;
                line-height: 16px;
                margin: 0 0 8px 0;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
              "
            >
              Verification Code
            </Text>
            <Text
              style="
                color: #1a1a1a;
                font-size: 32px;
                line-height: 40px;
                margin: 0;
                font-weight: 700;
                letter-spacing: 4px;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                  monospace;
              "
            >
              {{ verificationCode }}
            </Text>
          </Section>
        </Section>

        <!-- Expiry Notice -->
        <Section
          style="
            background-color: #fef3c7;
            border: 1px solid #fbbf24;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 32px;
            text-align: center;
          "
        >
          <Text
            style="
              color: #92400e;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
              font-weight: 600;
            "
          >
            ⏰ This code expires in {{ expiresIn }}
          </Text>
        </Section>

        <!-- Instructions -->
        <Section style="margin-bottom: 32px">
          <Heading
            style="
              color: #1a1a1a;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 16px 0;
            "
          >
            How to use this code:
          </Heading>
          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 12px 0;
            "
          >
            1. Return to the sign-in page where you were prompted for the
            verification code
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 12px 0;
            "
          >
            2. Enter the 6-digit code:
            <strong
              style="
                color: #1a1a1a;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                  monospace;
              "
              >{{ verificationCode }}</strong
            >
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0;
            "
          >
            3. Click "Verify" to complete your sign-in
          </Text>
        </Section>

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
              margin: 0 0 12px 0;
            "
          >
            Never share this code with anyone. We will never ask for your
            verification code via email, phone, or text.
          </Text>
          <Text
            style="
              color: #1e40af;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            If you didn't attempt to sign in, please secure your account
            immediately.
          </Text>
        </Section>

        <!-- Login Details -->
        <Section
          v-if="ipAddress || location"
          style="
            background-color: #f1f5f9;
            border: 1px solid #cbd5e1;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 32px;
          "
        >
          <Text
            style="
              color: #475569;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
              font-weight: 600;
            "
          >
            Sign-in Attempt Details
          </Text>
          <Text
            v-if="location"
            style="
              color: #475569;
              font-size: 12px;
              line-height: 18px;
              margin: 0 0 4px 0;
              font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                monospace;
            "
          >
            Location: {{ location }}
          </Text>
          <Text
            v-if="ipAddress"
            style="
              color: #475569;
              font-size: 12px;
              line-height: 18px;
              margin: 0;
              font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                monospace;
            "
          >
            IP Address: {{ ipAddress }}
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
          Having trouble with verification?
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
          or contact our support team.
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
          This verification code was generated for your account security.
        </Text>
        <Text
          style="color: #999999; font-size: 12px; line-height: 16px; margin: 0"
        >
          If you didn't attempt to sign in, please contact support immediately.
        </Text>
      </Section>
    </Container>
  </Html>
</template>
