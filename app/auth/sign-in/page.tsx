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
          Authentication
        </CardTitle>
        <CardDescription className="max-w-sm text-center"> Use Apple Face ID, Fingerprint or Windows Hello, along with your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <PasskeySignInForm />
      </CardContent>
    </Card>
  )
}
