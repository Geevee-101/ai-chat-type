import { Spinner } from "@/components/ui/spinner";

export function PageLoader() {
  return (
    <div className="h-full grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default PageLoader;
