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
  dashboardUrl: {
    type: String,
    default: "https://app.example.com/dashboard",
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
      >Welcome to our platform! Get started with your new account.</Preview
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
          Welcome, {{ userName }}! 🎉
        </Heading>
        <Text
          style="
            color: #666666;
            font-size: 16px;
            line-height: 24px;
            margin: 0 0 24px 0;
            text-align: center;
          "
        >
          We're excited to have you on board. Your account has been successfully
          created and you're ready to explore all our features.
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
        <!-- Account Details -->
        <Section
          style="
            background-color: #f8f9fa;
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
            Account Details
          </Heading>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0 0 8px 0;
            "
          >
            <strong style="color: #1a1a1a">Name:</strong> {{ userName }}
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 14px;
              line-height: 20px;
              margin: 0;
            "
          >
            <strong style="color: #1a1a1a">Email:</strong> {{ userEmail }}
          </Text>
        </Section>

        <!-- Next Steps -->
        <Heading
          style="
            color: #1a1a1a;
            font-size: 20px;
            font-weight: 600;
            margin: 0 0 20px 0;
          "
        >
          Next Steps
        </Heading>

        <Section style="margin-bottom: 24px">
          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 16px 0;
            "
          >
            <strong style="color: #1a1a1a">1. Complete your profile</strong
            ><br />
            Add your personal information and preferences to get the most out of
            our platform.
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 16px 0;
            "
          >
            <strong style="color: #1a1a1a">2. Explore the dashboard</strong
            ><br />
            Familiarize yourself with all the tools and features available to
            you.
          </Text>
          <Text
            style="
              color: #666666;
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 32px 0;
            "
          >
            <strong style="color: #1a1a1a">3. Connect with our community</strong
            ><br />
            Join discussions and connect with other users to maximize your
            experience.
          </Text>
        </Section>

        <!-- CTA Button -->
        <Section style="text-align: center; margin-bottom: 32px">
          <Button
            :href="dashboardUrl"
            style="
              background-color: #2563eb;
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
            "
          >
            Get Started
          </Button>
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
          Need help getting started? We're here for you.
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
          style="color: #999999; font-size: 12px; line-height: 16px; margin: 0"
        >
          This email was sent because you created an account with us.
        </Text>
      </Section>
    </Container>
  </Html>
</template>
