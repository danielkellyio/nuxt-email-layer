<script setup lang="ts">
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "email-devtools",
});

interface Email {
  id: string;
  to: string;
  from?: string;
  subject?: string;
  body?: string;
  timestamp: string;
}

const emails = ref<Email[]>([]);
const selectedEmail = ref<Email | null>(null);
const loading = ref(false);
const refreshing = ref(false);
const sendingTest = ref(false);

async function fetchEmails() {
  try {
    loading.value = true;
    const response = (await $fetch("/api/__devtools/emails")) as {
      emails: Email[];
    };
    emails.value = response.emails || [];
  } catch (error) {
    console.error("Failed to fetch emails:", error);
  } finally {
    loading.value = false;
  }
}

async function deleteEmail(id: string) {
  try {
    await $fetch(`/api/__devtools/emails/${id}`, { method: "DELETE" });
    await fetchEmails();
    if (selectedEmail.value?.id === id) {
      selectedEmail.value = null;
    }
  } catch (error) {
    console.error("Failed to delete email:", error);
  }
}

async function clearAllEmails() {
  try {
    await $fetch("/api/__devtools/emails/clear", { method: "DELETE" });
    await fetchEmails();
    selectedEmail.value = null;
  } catch (error) {
    console.error("Failed to clear emails:", error);
  }
}

async function refreshEmails() {
  refreshing.value = true;
  await fetchEmails();
  refreshing.value = false;
}

async function sendTestEmail() {
  try {
    sendingTest.value = true;
    await $fetch("/api/__devtools/emails/send");
    // Wait a moment then refresh to show the new email
    setTimeout(async () => {
      await fetchEmails();
    }, 1000);
  } catch (error) {
    console.error("Failed to send test email:", error);
  } finally {
    sendingTest.value = false;
  }
}

function selectEmail(email: Email) {
  selectedEmail.value = email;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString();
}

function truncateText(text: string, maxLength: number = 50) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

onMounted(() => {
  fetchEmails();
});
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div
      class="flex justify-between items-center p-4 bg-white border-b dark:bg-[#161616] dark:border-[#2f2f30]"
    >
      <div class="flex gap-3 items-center">
        <h1 class="text-xl font-semibold text-[#161616] dark:text-gray-200">
          Mail Devtools
        </h1>
        <NBadge v-if="emails.length > 0" n="green">
          {{ emails.length }} {{ emails.length === 1 ? "email" : "emails" }}
        </NBadge>
      </div>

      <div class="flex gap-2 items-center">
        <NButton n="sm green" :disabled="sendingTest" @click="sendTestEmail">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              :class="{ 'animate-pulse': sendingTest }"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m22 2l-7 20l-4-9l-9-4z"
              />
            </svg>
          </template>
          {{ sendingTest ? "Sending..." : "Send Test" }}
        </NButton>

        <NButton n="sm" :disabled="refreshing" @click="refreshEmails">
          <template #icon>
            <div :class="{ 'animate-spin': refreshing }">⟳</div>
          </template>
          Refresh
        </NButton>

        <NButton
          n="sm red"
          :disabled="emails.length === 0"
          @click="clearAllEmails"
        >
          <template #icon
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
              /></svg
          ></template>
          Clear All
        </NButton>
      </div>
    </div>

    <div class="flex overflow-hidden flex-1">
      <!-- Email List Sidebar -->
      <div
        class="overflow-y-auto w-1/4 bg-white border-r dark:bg-[#161616] dark:border-[#2f2f30]"
      >
        <div v-if="loading" class="p-4 text-center">
          <NLoading />
          <p class="mt-2 text-gray-500 dark:text-gray-400">Loading emails...</p>
        </div>

        <div v-else-if="emails.length === 0" class="p-8 text-center">
          <div class="flex justify-center items-center mb-4 text-6xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M4 2c-1.1 0-2 .895-2 2v.5a.5.5 0 0 0 1 0V4a1 1 0 0 1 1-1h.5a.5.5 0 0 0 0-1zm10 2.5V4c0-1.1-.895-2-2-2h-.5a.5.5 0 0 0 0 1h.5a1 1 0 0 1 1 1v.5a.5.5 0 0 0 1 0M12 14h-.5a.5.5 0 0 1 0-1h.5a1 1 0 0 0 1-1v-.5a.5.5 0 0 1 1 0v.5c0 1.1-.895 2-2 2M2 12c0 1.1.895 2 2 2h.5a.5.5 0 0 0 0-1H4a1 1 0 0 1-1-1v-.5a.5.5 0 0 0-1 0zm5-9.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-4 5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm4 6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m7-6a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0z"
              />
            </svg>
          </div>
          <h3
            class="mb-2 text-lg font-medium text-[#2f2f30] dark:text-gray-300"
          >
            No emails yet
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Emails sent through mailcatcher will appear here.
          </p>
        </div>

        <div v-else class="divide-y dark:divide-[#2f2f30]">
          <div
            v-for="email in emails"
            :key="email.id"
            :class="[
              'p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2f2f30] transition-colors',
              selectedEmail?.id === email.id
                ? 'bg-blue-50 dark:bg-blue-900/30 border-r-2 border-blue-500 dark:border-blue-400'
                : '',
            ]"
            @click="selectEmail(email)"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-gray-100"
                >
                  {{ email.to }}
                </p>
                <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                  From: {{ email.from || "Unknown" }}
                </p>
              </div>
              <NButton
                n="xs red"
                class="ml-2"
                @click.stop="deleteEmail(email.id)"
              >
                ×
              </NButton>
            </div>

            <h4
              class="mb-1 text-sm font-medium text-[#161616] truncate dark:text-gray-200"
            >
              {{ email.subject || "No Subject" }}
            </h4>

            <p class="text-xs text-gray-400 dark:text-gray-500">
              {{ formatDate(email.timestamp) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Email Detail View -->
      <div class="flex flex-col flex-1 bg-white dark:bg-[#161616] w-3/4">
        <div
          v-if="!selectedEmail"
          class="flex flex-1 justify-center items-center"
        >
          <div class="text-center">
            <div class="flex justify-center items-center mb-4 text-6xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="58"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                </g>
              </svg>
            </div>
            <h3
              class="mb-2 text-lg font-medium text-[#2f2f30] dark:text-gray-300"
            >
              Select an email
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              Choose an email from the list to view its contents.
            </p>
          </div>
        </div>

        <div v-else class="flex overflow-hidden flex-col flex-1">
          <!-- Email Header -->
          <div class="p-3 border-b dark:border-[#2f2f30]">
            <div class="flex justify-between items-start mb-2">
              <h2
                class="flex-1 mr-4 text-base font-semibold text-gray-900 truncate dark:text-gray-100"
              >
                {{ selectedEmail.subject || "No Subject" }}
              </h2>
              <div class="flex gap-2 items-center">
                <NButton n="xs red" @click="deleteEmail(selectedEmail.id)">
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                      />
                    </svg>
                  </template>
                  Delete
                </NButton>
              </div>
            </div>

            <div class="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
              <span>
                <span class="font-medium text-[#2f2f30] dark:text-gray-300"
                  >To:</span
                >
                {{ selectedEmail.to }}
              </span>
              <span>
                <span class="font-medium text-[#2f2f30] dark:text-gray-300"
                  >From:</span
                >
                {{ selectedEmail.from || "Unknown" }}
              </span>
              <span>
                <span class="font-medium text-[#2f2f30] dark:text-gray-300"
                  >Date:</span
                >
                {{ formatDate(selectedEmail.timestamp) }}
              </span>
            </div>
          </div>

          <!-- Email Content -->
          <div class="overflow-y-auto">
            <div class="flex-1 p-4">
              <div class="mb-3">
                <div class="">
                  <div v-if="selectedEmail.body" class="p-4">
                    <iframe
                      :srcdoc="selectedEmail.body"
                      class="w-full h-96 rounded border"
                      sandbox="allow-same-origin allow-popups allow-forms allow-scripts"
                    />
                  </div>
                  <div
                    v-else
                    class="p-4 italic text-gray-500 dark:text-gray-400"
                  >
                    No content available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
