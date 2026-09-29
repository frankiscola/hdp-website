import { createFileRoute, redirect } from "@tanstack/react-router";

// Old URL of the HyperHub Network page: kept so existing links keep working.
export const Route = createFileRoute("/student-teams-and-competitions")({
  beforeLoad: () => {
    throw redirect({ to: "/hyperhub", statusCode: 301 });
  },
});
