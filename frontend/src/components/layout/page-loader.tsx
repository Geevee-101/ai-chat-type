import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

export function PageLoader({ publicRoute }: { publicRoute: boolean }) {
  const [showBackendMessage, setShowBackendMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackendMessage(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-full grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <p className="text-muted-foreground">Loading...</p>
        {publicRoute && showBackendMessage && (
          <p className="text-muted-foreground">
            Waking up the server. This may take a moment.
          </p>
        )}
        {!publicRoute && showBackendMessage && (
          <p className="text-muted-foreground">
            This may take a moment. Please wait.
          </p>
        )}
      </div>
    </div>
  );
}

export default PageLoader;
