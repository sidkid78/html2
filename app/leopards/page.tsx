"use client";

export default function LeopardsPage() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <iframe
        src="/leopards.html"
        className="w-full h-full border-none block"
        title="The Lewis Huggins Leopards"
        allowFullScreen
      />
    </div>
  );
}
