<script setup lang="ts">
import { Button, Hr, Html, Text } from "@vue-email/components";

defineProps({
  title: {
    type: String,
    default: "Hello World",
  },
});
</script>

<template>
  <Html lang="en">
    <Text>{{ title }}</Text>
    <Hr />
    <Button
      href="https://example.com"
      style="background-color: #61dafb; padding: 10px 20px"
      >Click me</Button
    >
  </Html>
</template>
