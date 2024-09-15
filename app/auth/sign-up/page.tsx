import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PasskeySignInForm from "@/app/auth/_components/passkey-sign-in-form";
import { PersonIcon } from "@radix-ui/react-icons";

export default function page() {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex text-center justify-center items-center text-2xl font-bold space-x-3">
          <PersonIcon className="h-6 w-6 mr-3"/>
          Passkey Auth
        </CardTitle>
        <CardDescription>Apple Face ID, Fingerprint or Windows Hello.</CardDescription>
      </CardHeader>
      <CardContent>
        <PasskeySignInForm />
        <div className="grid grid-cols-3 items-center py-3">
          <Separator />
          <span className="text-muted-foreground text-center">or</span>
          <Separator />
        </div>
      </CardContent>
    </Card>
  )
}
