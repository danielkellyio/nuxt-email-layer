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
  loginTime: {
    type: String,
    default: "",
  },
  ipAddress: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  device: {
    type: String,
    default: "",
  },
  browser: {
    type: String,
    default: "",
  },
  wasSuccessful: {
    type: Boolean,
    default: true,
  },
  secureAccountUrl: {
    type: String,
    default: "https://app.example.com/security",
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
    <Preview v-if="wasSuccessful"
      >New sign-in detected from {{ location || "unknown location" }}</Preview
    >
    <Preview v-else>Suspicious login attempt blocked for your account</Preview>

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
            v-if="wasSuccessful"
            style="
              width: 64px;
              height: 64px;
              background-color: #16a34a;
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
          <div
            v-else
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
              >⚠️</span
            >
          </div>
        </Section>

        <Heading
          v-if="wasSuccessful"
          style="
            color: #1a1a1a;
            font-size: 28px;
            font-weight: 600;
            line-height: 36px;
            margin: 0 0 16px 0;
            text-align: center;
          "
        >
          New Sign-in Detected
        </Heading>
        <Heading
          v-else
          style="
            color: #1a1a1a;
            font-size: 28px;
            font-weight: 600;
            line-height: 36px;
            margin: 0 0 16px 0;
            text-align: center;
          "
        >
          Suspicious Activity Blocked
        </Heading>

        <Text
          v-if="wasSuccessful"
          style="
            color: #666666;
            font-size: 16px;
            line-height: 24px;
            margin: 0;
            text-align: center;
          "
        >
          Hi {{ userName }}, we detected a new sign-in to your account. If this
          was you, no action is needed.
        </Text>
        <Text
          v-else
          style="
            color: #666666;
            font-size: 16px;
            line-height: 24px;
            margin: 0;
            text-align: center;
          "
        >
          Hi {{ userName }}, we blocked a suspicious login attempt to your
          account. Your account remains secure.
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
        <!-- Activity Details -->
        <Section
          style="
            background-color: #f8f9fa;
            border: 1px solid #e6e6e6;
            padding: 24px;
            border-radius: 6px;
            margin-bottom: 32px;
          "
        >
          <Heading
            style="
              color: #1a1a1a;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 16px 0;
            "
          >
            Activity Details
          </Heading>

          <Section style="margin-bottom: 16px">
            <Text
              style="
                color: #1a1a1a;
                font-size: 14px;
                line-height: 20px;
                margin: 0 0 4px 0;
                font-weight: 600;
              "
            >
              Status
            </Text>
            <Text
              v-if="wasSuccessful"
              style="
                color: #16a34a;
                font-size: 14px;
                line-height: 20px;
                margin: 0;
                display: flex;
                align-items: center;
              "
            >
              <span
                style="
                  width: 8px;
                  height: 8px;
                  background-color: #16a34a;
                  border-radius: 50%;
                  margin-right: 8px;
                  display: inline-block;
                "
              ></span>
              Successful Login
            </Text>
            <Text
              v-else
              style="
                color: #dc2626;
                font-size: 14px;
                line-height: 20px;
                margin: 0;
                display: flex;
                align-items: center;
              "
            >
              <span
                style="
                  width: 8px;
                  height: 8px;
                  background-color: #dc2626;
                  border-radius: 50%;
                  margin-right: 8px;
                  display: inline-block;
                "
              ></span>
              Login Blocked
            </Text>
          </Section>

          <Section v-if="loginTime" style="margin-bottom: 16px">
            <Text
              style="
                color: #1a1a1a;
                font-size: 14px;
                line-height: 20px;
                margin: 0 0 4px 0;
                font-weight: 600;
              "
            >
              Time
            </Text>
            <Text
              style="
                color: #666666;
                font-size: 14px;
                line-height: 20px;
                margin: 0;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                  monospace;
              "
            >
              {{ loginTime }}
            </Text>
          </Section>

          <Section v-if="location" style="margin-bottom: 16px">
            <Text
              style="
                color: #1a1a1a;
                font-size: 14px;
                line-height: 20px;
                margin: 0 0 4px 0;
                font-weight: 600;
              "
            >
              Location
            </Text>
            <Text
              style="
                color: #666666;
                font-size: 14px;
                line-height: 20px;
                margin: 0;
              "
            >
              {{ location }}
            </Text>
          </Section>

          <Section v-if="ipAddress" style="margin-bottom: 16px">
            <Text
              style="
                color: #1a1a1a;
                font-size: 14px;
                line-height: 20px;
                margin: 0 0 4px 0;
                font-weight: 600;
              "
            >
              IP Address
            </Text>
            <Text
              style="
                color: #666666;
                font-size: 14px;
                line-height: 20px;
                margin: 0;
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
                  monospace;
              "
            >
              {{ ipAddress }}
            </Text>
          </Section>

          <Section v-if="device" style="margin-bottom: 16px">
            <Text
              style="
                color: #1a1a1a;
                font-size: 14px;
                line-height: 20px;
                margin: 0 0 4px 0;
                font-weight: 600;
              "
            >
              Device
            </Text>
            <Text
              style="
                color: #666666;
                font-size: 14px;
                line-height: 20px;
                margin: 0;
              "
            >
              {{ device }}
            </Text>
          </Section>

          <Section v-if="browser">
            <Text
              style="
                color: #1a1a1a;
                font-size: 14px;
                line-height: 20px;
                margin: 0 0 4px 0;
                font-weight: 600;
              "
            >
              Browser
            </Text>
            <Text
              style="
                color: #666666;
                font-size: 14px;
                line-height: 20px;
                margin: 0;
              "
            >
              {{ browser }}
            </Text>
          </Section>
        </Section>

        <!-- Security Alert -->
        <Section
          v-if="wasSuccessful"
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
            🔒 Security Check
          </Text>
          <Text
            style="
              color: #1e40af;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            If this wasn't you, please secure your account immediately by
            changing your password and reviewing your security settings.
          </Text>
        </Section>

        <Section
          v-else
          style="
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 32px;
          "
        >
          <Text
            style="
              color: #dc2626;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
              font-weight: 600;
            "
          >
            🛡️ Account Protected
          </Text>
          <Text
            style="
              color: #dc2626;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            We blocked this login attempt because it appeared suspicious. Your
            account remains secure and no action is required from you.
          </Text>
        </Section>

        <!-- Action Button -->
        <Section style="text-align: center; margin-bottom: 32px">
          <Button
            :href="secureAccountUrl"
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
            Review Security Settings
          </Button>
        </Section>

        <!-- Additional Security Tips -->
        <Section
          style="
            background-color: #f1f5f9;
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
              margin: 0 0 12px 0;
              font-weight: 600;
            "
          >
            Security Best Practices:
          </Text>
          <Text
            style="
              color: #475569;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
            "
          >
            • Enable two-factor authentication for extra security
          </Text>
          <Text
            style="
              color: #475569;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
            "
          >
            • Use a unique, strong password for your account
          </Text>
          <Text
            style="
              color: #475569;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
            "
          >
            • Keep your devices and browsers updated
          </Text>
          <Text
            style="
              color: #475569;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            • Sign out from shared or public devices
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
          Concerned about your account security?
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
            >security team</Link
          >
          for immediate assistance.
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
          This security alert was sent to keep your account safe.
        </Text>
        <Text
          style="color: #999999; font-size: 12px; line-height: 16px; margin: 0"
        >
          We recommend reviewing all login notifications carefully.
        </Text>
      </Section>
    </Container>
  </Html>
</template>
