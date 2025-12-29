import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageSquareCode } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Spinner } from "@/components/ui/spinner";

export function NotFound() {
  return (
    <div className="w-screen md:h-screen flex p-4 items-center justify-center">
      <div className="w-full md:max-w-6xl h-full min-h-[460px] md:max-h-[650px] 2xl:max-h-[800px] flex flex-col md:flex-row relative items-center overflow-hidden bg-background border border-primary rounded-2xl">
        <div className="absolute top-0 w-full flex p-8 justify-end">
          <ModeToggle />
        </div>
        {/* LOW-GOW COLUMN - LEFT SIDE */}
        <div className="w-full md:w-1/2 h-full pt-6 pb-2 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="text-lg text-primary">Page Not Found</p>
          </div>
        </div>
        {/* FORM COLUMN - RIGHT SIDE */}
        <div className="w-full md:w-1/2 h-full p-8 flex flex-col items-center justify-center">
          <Card className="w-full flex flex-col justify-between rounded-xl border">
            <CardHeader>
              <CardTitle as="h2">
                The page you're looking for doesn't exist.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mt-2">
                Please check the URL or try navigating to a different page.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">GO TO LOG IN</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
