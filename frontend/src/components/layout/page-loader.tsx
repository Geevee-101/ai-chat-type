import { Spinner } from "@/components/ui/spinner";

export function PageLoader() {
  return (
    <div className="w-full h-full flex px-4 pt-4 items-center justify-center">
      <div className="w-full md:max-w-6xl h-full min-h-[460px] md:max-h-[650px] 2xl:max-h-[800px] flex flex-col relative items-center bg-background border border-primary rounded-2xl overflow-hidden">
        <div className="h-full grid place-items-center">
          <div className="flex flex-col items-center gap-2">
            <Spinner />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
