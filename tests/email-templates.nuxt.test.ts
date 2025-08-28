import { test, expect, describe } from "vitest";
import MyTemplate from "../layer/components/emails/hello-world.vue";
import { render } from "@vue-email/render";

describe("email-templates", () => {
  test("how rendering works from the library", async () => {
    const html = await render(
      MyTemplate,
      {
        title: "some title",
      },
      {
        pretty: true,
      }
    );

    expect(html).toContain("some title");
    expect(html).toContain(`<html lang="en"`);
  });
});
