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
  resetUrl: {
    type: String,
    default: "https://app.example.com/reset",
  },
  expiresIn: {
    type: String,
    default: "1 hour",
  },
  ipAddress: {
    type: String,
    default: "",
  },
  userAgent: {
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
      >Reset your password - this link expires in {{ expiresIn }}.</Preview
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
              background-color: #dc2626;
              border-radius: 50%;
              margin: 0 auto 16px auto;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span style="color: #ffffff; font-size: 24px; font-weight: 600"
              >🔑</span
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
          Reset Your Password
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
          Hi {{ userName }}, we received a request to reset your password. Click
          the button below to create a new password.
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
        <!-- Security Alert -->
        <Section
          style="
            background-color: #fef3c7;
            border: 1px solid #fbbf24;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 32px;
          "
        >
          <Text
            style="
              color: #92400e;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
              font-weight: 600;
            "
          >
            ⚠️ Security Alert
          </Text>
          <Text
            style="
              color: #92400e;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 12px 0;
            "
          >
            This reset link will expire in {{ expiresIn }}. If you didn't
            request this password reset, please ignore this email and your
            password will remain unchanged.
          </Text>
          <Text
            style="
              color: #92400e;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            For your security, we recommend changing your password regularly and
            using a unique, strong password.
          </Text>
        </Section>

        <!-- CTA Button -->
        <Section style="text-align: center; margin-bottom: 32px">
          <Button
            :href="resetUrl"
            style="
              background-color: #dc2626;
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
            Reset Password
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
            {{ resetUrl }}
          </Text>
        </Section>

        <!-- Request Details -->
        <Section
          v-if="ipAddress || userAgent"
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
            Request Details
          </Text>
          <Text
            v-if="ipAddress"
            style="
              color: #475569;
              font-size: 12px;
              line-height: 18px;
              margin: 0 0 4px 0;
              font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                monospace;
            "
          >
            IP Address: {{ ipAddress }}
          </Text>
          <Text
            v-if="userAgent"
            style="
              color: #475569;
              font-size: 12px;
              line-height: 18px;
              margin: 0;
              font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                monospace;
            "
          >
            Browser: {{ userAgent }}
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
          Didn't request this password reset?
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
          Contact our
          <Link :href="supportUrl" style="color: #2563eb; text-decoration: none"
            >support team</Link
          >
          immediately if you're concerned about your account security.
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
          This password reset was requested for your account.
        </Text>
        <Text
          style="color: #999999; font-size: 12px; line-height: 16px; margin: 0"
        >
          If you didn't request this, you can safely ignore this email.
        </Text>
      </Section>
    </Container>
  </Html>
</template>
