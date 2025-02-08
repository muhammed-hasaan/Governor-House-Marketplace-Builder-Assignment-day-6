import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignIn, SignInButton } from "@clerk/nextjs";

interface StatusCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

function StatusCard({
  title,
  description,
  children,
  className,
}: StatusCardProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Card className={`w-full max-w-md ${className}`}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

export function LoadingState() {
  return (
    <StatusCard
      title="Loading"
      description="Please wait while we fetch your information"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">
        Loading tracking information...
      </p>
    </StatusCard>
  );
}

export function NoTrackingInfo() {
  return (
    <StatusCard
      title="No Tracking Information"
      description="We couldn't find any tracking details"
    >
      <p className="text-center text-sm text-muted-foreground">
        There is no tracking information available for this order. Please check
        back later or contact support if you believe this is an error.
      </p>
      <Button variant="outline" className="mt-4">
        Refresh
      </Button>
    </StatusCard>
  );
}

export function AuthenticationRequired() {
  return (
    <StatusCard
      title="Authentication Required"
      description="Please sign in to view your orders"
    >
      <SignIn />
    </StatusCard>
  );
}

export function SimpleAuthRequired() {
  return (
    <StatusCard
      title="Sign In Required"
      description="Please sign in to continue"
    >
      <p className="text-center text-sm text-muted-foreground">
        You need to be signed in to view this content. Please sign in to
        continue.
      </p>
      <Button className="mt-4">Sign In</Button>
    </StatusCard>
  );
}
