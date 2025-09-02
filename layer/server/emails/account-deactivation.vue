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
  userEmail: {
    type: String,
    default: "user@example.com",
  },
  deactivationDate: {
    type: String,
    default: "",
  },
  reactivateUrl: {
    type: String,
    default: "https://app.example.com/reactivate",
  },
  supportUrl: {
    type: String,
    default: "https://help.example.com",
  },
  dataRetentionDays: {
    type: Number,
    default: 30,
  },
});
</script>

<template>
  <Html lang="en">
    <Head />
    <Preview
      >Your account has been deactivated - you have {{ dataRetentionDays }} days
      to reactivate</Preview
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
              background-color: #f59e0b;
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
          style="
            color: #1a1a1a;
            font-size: 28px;
            font-weight: 600;
            line-height: 36px;
            margin: 0 0 16px 0;
            text-align: center;
          "
        >
          Account Deactivated
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
          Hi {{ userName }}, your account has been successfully deactivated as
          requested.
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
        <!-- Deactivation Summary -->
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
            Deactivation Details
          </Heading>

          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
            "
          >
            <strong style="color: #1a1a1a">Account:</strong> {{ userEmail }}
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
            "
          >
            <strong style="color: #1a1a1a">Deactivated on:</strong>
            {{ deactivationDate }}
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            <strong style="color: #1a1a1a">Status:</strong>
            <span style="color: #f59e0b; font-weight: 600"
              >Temporarily Deactivated</span
            >
          </Text>
        </Section>

        <!-- What Happens Now -->
        <Section style="margin-bottom: 32px">
          <Heading
            style="
              color: #1a1a1a;
              font-size: 20px;
              font-weight: 600;
              margin: 0 0 20px 0;
            "
          >
            What Happens Now?
          </Heading>

          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 16px 0;
            "
          >
            <strong style="color: #1a1a1a"
              >Your account is temporarily deactivated:</strong
            >
          </Text>

          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 12px 0;
              padding-left: 16px;
            "
          >
            • You cannot sign in to your account
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 12px 0;
              padding-left: 16px;
            "
          >
            • Your profile and data are hidden from other users
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 12px 0;
              padding-left: 16px;
            "
          >
            • You will not receive any notifications or emails
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 24px 0;
              padding-left: 16px;
            "
          >
            • Your data is safely stored for {{ dataRetentionDays }} days
          </Text>
        </Section>

        <!-- Data Retention Notice -->
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
            📅 Important: {{ dataRetentionDays }}-Day Grace Period
          </Text>
          <Text
            style="
              color: #92400e;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            You have {{ dataRetentionDays }} days to reactivate your account.
            After this period, your account and all associated data will be
            permanently deleted and cannot be recovered.
          </Text>
        </Section>

        <!-- Reactivation -->
        <Section style="margin-bottom: 32px">
          <Heading
            style="
              color: #1a1a1a;
              font-size: 20px;
              font-weight: 600;
              margin: 0 0 16px 0;
            "
          >
            Want to Reactivate?
          </Heading>
          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 20px 0;
            "
          >
            Changed your mind? You can easily reactivate your account at any
            time within the next {{ dataRetentionDays }} days.
          </Text>

          <Section style="text-align: center; margin-bottom: 20px">
            <Button
              :href="reactivateUrl"
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
              Reactivate Account
            </Button>
          </Section>

          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
              text-align: center;
            "
          >
            All your data, settings, and preferences will be restored exactly as
            you left them.
          </Text>
        </Section>

        <!-- Alternative Reactivation -->
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
            Alternative Reactivation Method:
          </Text>
          <Text
            style="
              color: #475569;
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
            {{ reactivateUrl }}
          </Text>
        </Section>

        <!-- Permanent Deletion -->
        <Section
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
            ⚠️ Permanent Deletion
          </Text>
          <Text
            style="
              color: #dc2626;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            If you don't reactivate within {{ dataRetentionDays }} days, your
            account and all data will be permanently deleted. This action cannot
            be undone.
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
          Have questions about account deactivation?
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
          This email confirms your account deactivation request.
        </Text>
        <Text
          style="color: #999999; font-size: 12px; line-height: 16px; margin: 0"
        >
          We're sad to see you go, but we'll keep your data safe in case you
          change your mind.
        </Text>
      </Section>
    </Container>
  </Html>
</template>
